const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');
const request = require('request');
const jwt = require('jsonwebtoken');
global.fetch = require('node-fetch');
const credencialesAWS = require("../configs/identity/credenciales-cognito.json");
const Usuario = require('../models/usuario');


const poolData = {
    UserPoolId: credencialesAWS.UserPoolId,
    ClientId: credencialesAWS.ClientId
};

const pool_region = credencialesAWS.region;

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);


exports.registrar = (usuarioRequest) => {

    var attributeList = [];

    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "name", Value: usuarioRequest.body.nombre + ' ' + usuarioRequest.body.apellido }));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "address", Value: usuarioRequest.body.direccion }));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "profile", Value: 'MASIVO' }));

    return new Promise((resolve, reject) => {
    userPool.signUp(usuarioRequest.body.email, usuarioRequest.body.password, attributeList, null,
        (err, result) => {
            if (err) {
              console.log(err.message);
              reject(err);
              return;
            }
            cognitoUser = result.user;
            resolve(cognitoUser)
          });
        });
    }

exports.login = (usuario, password, response) => {
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: usuario,
        Password: password,
    });

    var userData = {
        Username: usuario,
        Pool: userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            var tokens = {
                accessToken: result.getAccessToken().getJwtToken(),
                idToken: result.getIdToken().getJwtToken(),
                refreshToken: result.getRefreshToken().getToken()
            };
            response(null, tokens);
        },
        onFailure: function (err) {
            response(err, null);
        },

    });
}


exports.solicitudRecuperacion = (usuario) => {

    return new Promise((resolve, reject) => {
        var userData = {
            Username: usuario,
            Pool: userPool
        };
        var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
        cognitoUser.forgotPassword({
            onSuccess: function (result) {
                resolve(result);
            },
            onFailure: function (err) {
                reject(err);
            },
        });
    });
}


exports.confirmarPasswordRecuperacion = (usuario, nuevaPassword, codigoVerificador) => {

    var userData = {
        Username: usuario,
        Pool: userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    return new Promise((resolve, reject) => {
        cognitoUser.confirmPassword(codigoVerificador, nuevaPassword, {
            onSuccess: function (result) {
                resolve(result);
            },
            onFailure: function (err) {
                reject(err);
            },
        });
    });
}


exports.decodificarToken = (token) => {
    return jwt.decode(token, { complete: true });
    //console.log("permisos de : " + decodedToken.payload.profile);
}
