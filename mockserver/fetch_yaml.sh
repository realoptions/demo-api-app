wget -O ./mockserver/openapi.yaml https://raw.githubusercontent.com/phillyfan1138/option_price_faas/master/docs/openapi_merged.yml --no-check-certificate

wget -O ./mockserver/apisprout.tar.xz https://github.com/danielgtaylor/apisprout/releases/download/v1.0.1/apisprout-v1.0.1-linux.tar.xz --no-check-certificate

tar xf ./mockserver/apisprout.tar.xz -C ./mockserver
rm ./mockserver/apisprout.tar.xz 