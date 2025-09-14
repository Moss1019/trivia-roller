package com.mossonthetree.trivia.resource;

import com.mossonthetree.trivia.result.OpResult;
import com.mossonthetree.trivia.result.RestResult;
import org.jboss.logging.Logger;

public abstract class Resource {
    private static final Logger LOG = Logger.getLogger(Resource.class);

    protected <T> RestResult<T> extract(OpResult<T> res) {
        if(!res.isValid()) {
            LOG.error("Error: " + res.getErrorMessage());
        }

        return res.isValid() ?
                RestResult.success(res.getContent()) :
                res.isInternalError() ?
                        RestResult.failed("Internal server error") :
                        RestResult.failed(res.getErrorMessage());
    }
}
