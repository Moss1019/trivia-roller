package com.mossonthetree.trivia.service;

import org.codehaus.plexus.util.Base64;
import org.jose4j.jwt.consumer.JwtConsumerBuilder;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.security.KeyFactory;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.X509EncodedKeySpec;
import java.util.List;

public class AuthServiceTest {
    @BeforeAll()
    public static void init() {
        var baseDir = System.getProperty("user.dir");
        var mainResources = baseDir + "/src/main/resources";
        var testResources = baseDir + "/src/test/resources";
        var files = List.of("privateKey.pem", "publicKey.pem");
        for(var file : files) {
            var mainFilePath = mainResources + "/" + file;
            var testFilePath = testResources + "/" + file;
            try(var inStream = new FileInputStream(mainFilePath);
                var outStream = new FileOutputStream(testFilePath)) {
                outStream.write(inStream.readAllBytes());
            } catch (Exception ignored) {
            }
        }
    }

    @AfterAll()
    public static void cleanup() {
        var baseDir = System.getProperty("user.dir");
        var testResources = baseDir + "/src/test/resources";
        var files = List.of("privateKey.pem", "publicKey.pem");
        for(var file : files) {
            var testFilePath = testResources + "/" + file;
            new File(testFilePath).delete();
        }
    }

    @Test()
    public void testAuthenticate() {
        var sut = new AuthService("TestIssuer");

        var isAuthenticated = sut.authenticate(new AuthService.Login("mossonthetree", "password"));

        Assertions.assertFalse(isAuthenticated);
    }

    @Test()
    public void testGenerateToken() {
        var sut = new AuthService("TestIssuer");

        var token = sut.generateToken("mossonthetree", "User");
        Assertions.assertNotNull(token);

        var publicKey = readPublicKey();
        Assertions.assertNotNull(publicKey, "Public key not found");

        var consumer = new JwtConsumerBuilder()
                .setExpectedIssuer("TestIssuer")
                .setVerificationKey(publicKey)
                .build();

        try {
            var claims = consumer.processToClaims(token);
            Assertions.assertEquals("mossonthetree", claims.getClaimValue("username"));
            Assertions.assertTrue(((List<String>)claims.getClaimValue("groups")).contains("User"));
        } catch (Exception ex) {
            Assertions.assertNull(ex, ex.getMessage());
        }
    }

    private RSAPublicKey readPublicKey() {
        try (var inStream = getClass().getResourceAsStream("/publicKey.pem")) {
            var pemFileContent = new String(inStream.readAllBytes());
            pemFileContent = pemFileContent.replace("-----BEGIN PUBLIC KEY-----", "")
                    .replaceAll(System.lineSeparator(), "")
                    .replace("-----END PUBLIC KEY-----", "");

            var encoded = Base64.decodeBase64(pemFileContent.getBytes());

            var keyFactory = KeyFactory.getInstance("RSA");
            var keySpec = new X509EncodedKeySpec(encoded);
            return (RSAPublicKey)keyFactory.generatePublic(keySpec);
        } catch (Exception ex) {
            Assertions.assertNull(ex, ex.getMessage());
        }
        return null;
    }
}
