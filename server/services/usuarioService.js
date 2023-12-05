const { response } = require("express");
const identityIntegration = require("../integrations/cognito");

/*exports.registrar = (usuario) => {
    return new Promise((resolve, reject) => {
            identityIntegration.registrar(usuario => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }        
            });
        });
    }
    */
exports.registrar = (usuario) => {
try{
    return identityIntegration.registrar(usuario); 
    }catch(ex){
        console.log(ex);
        throw new Error("error al registrar usuario, verifique los datos y vuelva a intentar");
    }
}
exports.login = (usuario, password) => {
    return new Promise((resolve, reject) => {

        identityIntegration.login(usuario, password, (error, result) => {
            if (error) {
                reject(error);
            } else {
                var tokens = {
                    accessToken: result.accessToken,
                    idToken: result.idToken,
                    refreshToken: result.refreshToken,
                    profile: (identityIntegration.decodificarToken(result.idToken)).payload.profile,
                    name: (identityIntegration.decodificarToken(result.idToken)).payload.name
                };
                resolve(tokens);
            }
        });
    });
};

exports.solicitarRecuperacion = (usuario) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await identityIntegration.solicitudRecuperacion(usuario);
            console.log('Solicitud exitosa');
            resolve(result);
        } catch (error) {
            console.error('Error en la solicitud de recuperación:', error);
            reject(error);
        }
    });
};

exports.confirmarPasswordRecuperacion = (usuario, nuevapassword, codigoverificado) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await identityIntegration.confirmarPasswordRecuperacion(usuario, nuevapassword, codigoverificado);
            console.log('confirmación exitosa');
            resolve(result);
        } catch (error) {
            console.error('Error al confirmar la recuperación:', error);
            reject(error);
        }
    });
}