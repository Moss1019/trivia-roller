package com.mossonthetree.trivia.resource;

import com.mossonthetree.trivia.result.OpResult;
import com.mossonthetree.trivia.result.RestResult;

public abstract class Resource {
    protected <T> RestResult<T> extract(OpResult<T> res) {
        return res.isValid() ?
                RestResult.success(res.getContent()) :
                res.isInternalError() ?
                        RestResult.failed("Internal server error") :
                        RestResult.failed(res.getErrorMessage());
    }
}
