package org.polytech.covidapi.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import static org.springframework.security.config.Customizer.withDefaults;

import java.io.IOException;

import org.polytech.covidapi.services.UtilisateurService;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private UtilisateurService utilisateurService;

    @Bean
    protected SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(authz -> authz
        .requestMatchers("/api/auth/**").permitAll()
        .requestMatchers("/api/public").permitAll()
        .requestMatchers("/api/user/**").hasRole("USER")
        .requestMatchers("/api/private/**").hasRole("ADMIN")
        
        .anyRequest().authenticated() )
        .formLogin(formLogin -> formLogin.loginPage("/api/auth/login")
                                        .usernameParameter("username")
                                        .passwordParameter("password")
                                        .successHandler(successHandler())
                                        .failureHandler(failureHandler())
                                        .permitAll())
        .logout(logout -> logout.logoutUrl("/api/auth/logout"))
            .httpBasic(withDefaults())
            .cors(cors -> cors.disable())
            .csrf(csrf -> csrf.disable());
            
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public PasswordEncoder getPasswordEncoder() {
        return passwordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http, BCryptPasswordEncoder bCryptPasswordEncoder) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder.userDetailsService(utilisateurService).passwordEncoder(bCryptPasswordEncoder);
        return authenticationManagerBuilder.build();
    }

    private AuthenticationSuccessHandler successHandler() {
    return new AuthenticationSuccessHandler() {
        @Override
        public void onAuthenticationSuccess(HttpServletRequest httpServletRequest,
                HttpServletResponse httpServletResponse, Authentication authentication)
                throws IOException, ServletException {
            httpServletResponse.getWriter().append("OK");
            httpServletResponse.setStatus(200);
        }
    };
}

private AuthenticationFailureHandler failureHandler() {
    return new AuthenticationFailureHandler() {
        @Override
        public void onAuthenticationFailure(HttpServletRequest httpServletRequest,
                HttpServletResponse httpServletResponse, AuthenticationException e)
                throws IOException, ServletException {
            httpServletResponse.getWriter().append("Authentication failure");
            httpServletResponse.setStatus(401);
        }
    };
}
}
