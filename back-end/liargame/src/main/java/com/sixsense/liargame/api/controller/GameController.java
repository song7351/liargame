package com.sixsense.liargame.api.controller;

import com.sixsense.liargame.api.service.GameService;
import com.sixsense.liargame.common.model.Vote;
import com.sixsense.liargame.security.auth.JwtProperties;
import com.sixsense.liargame.security.auth.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
@RequestMapping("/rooms/{roomId}/games")
public class GameController {
    private final GameService gameService;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping("/start")
    public ResponseEntity<?> start(HttpServletRequest request, @PathVariable Long roomId) {
        String accessToken = request.getHeader(JwtProperties.ACCESS_TOKEN);
        Long userId = jwtTokenProvider.getUserId(accessToken);
        gameService.normalGameStart(userId, roomId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/vote")
    public ResponseEntity<?> vote(@PathVariable Long roomId, Vote vote) {
        gameService.vote(vote, roomId);
        return ResponseEntity.ok(vote);
    }

    @PostMapping("/answer")
    public ResponseEntity<?> insertAnswer(@PathVariable Long roomId, String answer) {
        gameService.insertAnswer(answer, roomId);
        return ResponseEntity.ok(answer);
    }
}