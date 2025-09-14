package com.mossonthetree.trivia.resource;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.CacheControl;
import jakarta.ws.rs.core.Response;

@Path("/")
public class SpaResource {
    @GET
    @Path("{path: .*}")
    @Produces("text/html; charset=UTF-8")
    public Response spa(@PathParam("path") String path) {
        if (!path.contains(".")) {
            var in = getClass().getResourceAsStream("/META-INF/resources/index.html");
            if (in == null) {
                return Response.status(Response.Status.NOT_FOUND).build();
            }
            return Response.ok(in)
                    .cacheControl(CacheControl.valueOf("no-cache, no-store, must-revalidate"))
                    .build();
        }
        return Response.status(Response.Status.NOT_FOUND).build();
    }
}
