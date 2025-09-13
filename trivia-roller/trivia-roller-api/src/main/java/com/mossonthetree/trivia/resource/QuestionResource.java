package com.mossonthetree.trivia.resource;

import com.mossonthetree.trivia.model.Category;
import com.mossonthetree.trivia.model.Difficulty;
import com.mossonthetree.trivia.model.Question;
import com.mossonthetree.trivia.result.RestResult;
import com.mossonthetree.trivia.service.QuestionService;
import jakarta.annotation.security.RolesAllowed;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.SecurityContext;

import java.util.List;

@Path("")
@ApplicationScoped()
@Produces(MediaType.APPLICATION_JSON)
public class QuestionResource extends Resource {
    private final QuestionService service;

    public QuestionResource(QuestionService service) {
        this.service = service;
    }

    @GET()
    @Path("questions")
    @RolesAllowed("User")
    public RestResult<List<Question>> get(@QueryParam("amount") @DefaultValue("10") int amount,
                                          @QueryParam("category") @DefaultValue("ANY") Category category,
                                          @QueryParam("difficulty") @DefaultValue("ANY") Difficulty difficulty) {
        return extract(service.get(amount, category, difficulty));
    }

    @GET()
    @Path("categories")
    @RolesAllowed("User")
    public RestResult<List<Category.Details>> getCategories(@Context() SecurityContext ctx) {
        return extract(service.getCategories());
    }

    @GET()
    @Path("difficulty-levels")
    @RolesAllowed("User")
    public RestResult<List<Difficulty.Details>> getDifficultyLevels() {
        return extract(service.getDifficultyLevels());
    }
}
