package com.baatein.config;
import com.baatein.websocket.RawWebSocketHandler;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocket
public class RawWebSocketConfig implements WebSocketConfigurer {
    private final RawWebSocketHandler handler;
    public RawWebSocketConfig(RawWebSocketHandler handler) { this.handler = handler; }
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(handler, "/raw-ws").setAllowedOriginPatterns("*");
    }
}
