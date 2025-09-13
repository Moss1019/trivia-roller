
class Service {
    constructor(onError = null) {
        this.onError = onError;
    }

    _handlePromise(promise, onSuccess = null, onFailure = null) {
        return promise.then(res => {
            const data = res.data;
            if(data.successful) {
                if(onSuccess) {
                    onSuccess(data.content);
                }
            } else {
                if(onFailure) {
                    onFailure(data.message);
                }
            }
        }).catch(err => {
            if(this.onError) {
                this.onError(err);
            }
        })
    }
}

export default Service;
