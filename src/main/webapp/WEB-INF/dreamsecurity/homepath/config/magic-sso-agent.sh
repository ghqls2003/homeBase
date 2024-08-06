# Dreamsecurity MagicSSO Configuration Setting

export DS_HOME=/dreamsecurity/sso/agent/v35
export DS_CLASSPATH=$DS_HOME/lib/naru-sso-web-1.0.jar:$DS_HOME/lib/commons-collections-3.2.1.jar:$DS_HOME/lib/commons-digester-1.8.jar:$DS_HOME/lib/commons-configuration-1.6.jar:$DS_HOME/lib/commons-beanutils-1.8.0.jar:$DS_HOME/lib/commons-lang-2.4.jar:$DS_HOME/lib/biz-commons.jar:$DS_HOME/lib/servlet-api.jar:$DS_HOME:$DS_HOME/lib/log4j-1.2.15.jar:$DS_HOME/lib/commons-logging-1.1.1.jar:$DS_HOME/lib/dsagent-v35.jar:$DS_HOME/lib/DSToolkit.jar:$DS_HOME/lib/libgpkiapi_jni.jar:
export CLASSPATH=$DS_CLASSPATH:$CLASSPATH
export JAVA_OPTS="$JAVA_OPTS -Djava.library.path=$DS_HOME/lib -Dlog4j.configuration=file:$DS_HOME/config/logging/log4j.properties"
export LD_LIBRARY_PATH=$DS_HOME/lib:$LD_LIBRARY_PATH
export LIB_PATH=$DS_HOME/lib:$LIB_PATH