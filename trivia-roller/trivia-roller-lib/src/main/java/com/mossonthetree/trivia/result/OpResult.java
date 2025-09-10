package com.mossonthetree.trivia.result;

/**
 * Internal operation result object
 * Used to return the expected data from data sources (DB, external API)
 * Or indicate failure with an error message that can be logged and returned to a client
 * Two types of errors are possible, known errors that are safe to show the user, such as 'no result found'
 * or internal errors, which should not be shown to clients, such as exception messages
 * @param <T> expected result type
 */
public class OpResult<T> {
    private final T content;

    private final boolean isValid;

    private final boolean isInternalError;

    private final String errorMessage;

    /**
     * private constructor, use static factory methods instead
     * @param content expected result of type T, null of isValid == false
     * @param isValid true of the operation was successful, false if not
     * @param isInternalError indicates if the errorMessage is internal (i.e. from exception message) or not
     * @param errorMessage error message for logging and/or displaying to the user
     */
    private OpResult(T content, boolean isValid, boolean isInternalError, String errorMessage) {
        this.content = content;
        this.isValid = isValid;
        this.isInternalError = isInternalError;
        this.errorMessage = errorMessage;
    }

    public T getContent() {
        return content;
    }

    public boolean isValid() {
        return isValid;
    }

    public boolean isInternalError() {
        return isInternalError;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    /**
     *
     * @param data expected result of type T
     * @return OpResult object in a valid state
     * @param <T> expected result type
     */
    public static <T> OpResult<T> successful(T data) {
        return new OpResult<>(data, true, false, "");
    }

    /**
     *
     * @param errorMessage error message for logging and/or displaying to the user
     * @return OpResult object in failed state created from a string error message
     * @param <T> expected result type
     */
    public static <T> OpResult<T> failed(String errorMessage) {
        return new OpResult<>(null, false, false, errorMessage);
    }

    /**
     *
     * @param ex exception for logging
     * @return OpResult object in failed state created from an exception object, will be an internal error
     * @param <T> expected result type
     */
    public static <T> OpResult<T> failed(Exception ex) {
        return new OpResult<>(null, false, true, ex.getMessage());
    }

    /**
     *
     * @param other OpResult of different type to convert
     * @return OpResult object in failed state based on a different OpResult
     * @param <T> original expected result type
     * @param <R> expected result type
     */
    public static <T, R> OpResult<R> failed(OpResult<T> other) {
        return new OpResult<>(null, other.isValid, other.isInternalError, other.errorMessage);
    }
}
