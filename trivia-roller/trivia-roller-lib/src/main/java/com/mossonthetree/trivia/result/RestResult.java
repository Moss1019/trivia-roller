package com.mossonthetree.trivia.result;

/**
 * Result object to be returned from quarkus rest endpoints, this is for use between micro-services and
 * internally managed web/mobile apps
 * @param <T> expected result type
 */
public class RestResult<T> {
    private T content;

    private boolean successful;

    private String message;

    /**
     * private constructor, use static factory methods instead
     * @param content the result of type T, null if successful == false
     * @param successful true if the rest request yielded a result
     * @param message set to an error message, should be set if successful == false
     */
    private RestResult(T content, boolean successful, String message) {
        this.content = content;
        this.successful = successful;
        this.message = message;
    }

    public T getContent() {
        return content;
    }

    public void setContent(T content) {
        this.content = content;
    }

    public boolean isSuccessful() {
        return successful;
    }

    public void setSuccessful(boolean successful) {
        this.successful = successful;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    /**
     *
     * @param content expected result of type T
     * @return RestResult in successful state
     * @param <T> expected result type
     */
    public static <T> RestResult<T> success(T content) {
        return new RestResult<>(content, true, "");
    }

    /**
     *
     * @param message error message
     * @return RestResult in failed state
     * @param <T> expected result type
     */
    public static <T> RestResult<T> failed(String message) {
        return new RestResult<>(null, false, message);
    }

}
