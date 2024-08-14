    package com.example.demo.auth;

    import com.example.demo.config.JwtService;
    import com.example.demo.model.Profile;
    import com.example.demo.model.Token;
    import com.example.demo.model.User;
    import com.example.demo.repo.ProfileRepo;  // Ensure you have a Profile repository
    import com.example.demo.repo.TokenRepo;
    import com.example.demo.repo.UserRepo;
    import lombok.RequiredArgsConstructor;
    import org.springframework.security.authentication.AuthenticationManager;
    import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
    import org.springframework.security.crypto.password.PasswordEncoder;
    import org.springframework.stereotype.Service;

    @Service
    @RequiredArgsConstructor
    public class AuthenticationService {

        private final UserRepo userRepo;
        private final ProfileRepo profileRepo;
        private final PasswordEncoder passwordEncoder;
        private final JwtService jwtService;
        private final AuthenticationManager authenticationManager;
        private final TokenRepo tokenRepo;

        public AuthenticationResponse register(RegisterRequest request) {
            // Create and save the User entity
            var user = User.builder()
                    .name(request.getName())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .role(request.getRole())
                    .build();
            userRepo.save(user);

            // Create and save the Profile entity
            var profile = Profile.builder()
                    .name(request.getName())
                    .age(request.getAge())
                    .dept(request.getDept())
                    .role(request.getProfession()) // Convert enum to String
                    .experience(request.getExperience())
                    .mobile(request.getMobile())    
                    .address(request.getAddress())
                    .user(user)  // Set the User reference
                    .build();
            profileRepo.save(profile);

            // Generate JWT token
            var jwtToken = jwtService.generateToken(user);
            return AuthenticationResponse.builder()
                    .token(jwtToken)
                    .build();
        }

        public AuthenticationResponse authenticate(AuthenticationRequest request) {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
            var user = userRepo.findByEmail(request.getEmail()).orElseThrow();
            var jwtToken = jwtService.generateToken(user);
            revokeAllUserTokens(user);
            saveUserToken(user, jwtToken);
            return AuthenticationResponse.builder()
                    .token(jwtToken)
                    .role(user.getRole())
                    .build();
        }

        private void saveUserToken(User user, String accessToken) {
            var token = Token.builder().user(user).token(accessToken).expired(false).revoked(false).build();
            tokenRepo.save(token);
        }

        private void revokeAllUserTokens(User user) {
            var validUserTokens = tokenRepo.findAllByUser_IdAndExpiredFalseAndRevokedFalse(user.getId());
            if (validUserTokens.isEmpty())
                return;
            validUserTokens.forEach(token -> {
                token.setExpired(true);
                token.setRevoked(true);
            });
            tokenRepo.saveAll(validUserTokens);
        }

        public void logout(String username) {
            System.out.println("Logout Functionality Called");
            var user = userRepo.findByEmail(username).orElseThrow();
            revokeAllUserTokens(user);
        }
    }
