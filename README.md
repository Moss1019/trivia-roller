# trivia-roller
A technical test to implement a trivia questionnaire

## Generate private key
openssl genpkey -algorithm RSA -out privateKey.pem -pkcs8 -pass pass:secret

## Generate public key
openssl rsa -pubout -in privateKey.pem -out publicKey.pem -passin pass:secret

## For development, you might want to remove the passphrase:
openssl rsa -in privateKey.pem -out privateKey.pem -passin pass:secret
