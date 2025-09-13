package com.mossonthetree.trivia.resource;

import com.mossonthetree.trivia.result.RestResult;
import com.mossonthetree.trivia.service.AuthService;
import io.quarkus.security.UnauthorizedException;
import jakarta.annotation.security.PermitAll;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import org.eclipse.microprofile.openapi.annotations.parameters.RequestBody;

@Path("api/auth")
@Produces(MediaType.APPLICATION_JSON)
public class AuthResource extends Resource {
    private final AuthService service;

    public AuthResource(AuthService service) {
        this.service = service;
    }

    @POST()
    @Path("")
    @PermitAll()
    public RestResult<String> login(@RequestBody() AuthService.Login login) {
        if(service.authenticate(login)) {
            return RestResult.success(service.generateToken(login.username(), "User"));
        }
        throw new UnauthorizedException("Invalid username or password");
    }
}
