package com.mossonthetree.trivia.resource;

import com.mossonthetree.trivia.model.AnswerSubmission;
import com.mossonthetree.trivia.model.ReportCard;
import com.mossonthetree.trivia.result.RestResult;
import com.mossonthetree.trivia.service.AnswerService;
import jakarta.annotation.security.RolesAllowed;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import org.jboss.logging.Logger;

import java.util.List;

@Path("")
@Produces(MediaType.APPLICATION_JSON)
public class AnswerResource extends Resource {
    private static final Logger LOG = Logger.getLogger(AnswerResource.class);

    private final AnswerService service;

    public AnswerResource(AnswerService service) {
        this.service = service;
    }

    @POST()
    @Path("checkanswers")
    @RolesAllowed("User")
    public RestResult<ReportCard> evaluate(List<AnswerSubmission> submissions) {
        LOG.info("Evaluating " + submissions.size() + " answers");
        return extract(service.evaluate(submissions));
    }
}
