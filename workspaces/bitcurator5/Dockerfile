# Originally from "https://github.com/BitCurator/bitcurator-docker/blob/main/Dockerfile.noble"
# For a working Docker image see "https://hub.docker.com/repository/docker/squirrelworksllc/bitcurator5"

FROM kasmweb/kasmweb/ubuntu-noble-desktop
USER root

ENV HOME /home/kasm-default-profile
ENV STARTUPDIR /dockerstartup
ENV INST_SCRIPTS $STARTUPDIR/install
WORKDIR $HOME

######### Bitcurator Container Customizations ###########

# do we need all the switches? what happens if we leave it all default? install under kasm user?
# will HEAVILY need to customize to point to kasm user's stuff!
ARG BITCURATOR_CLI=3.0.0
ARG BITCURATOR_VERSION=5.1.0

RUN apt-get update && apt-get install nano wget curl gnupg sudo -y && \
curl -Lo /usr/local/bin/bitcurator https://github.com/bitcurator/bitcurator-cli/releases/download/v${BITCURATOR_CLI}/bitcurator-cli-linux && \
chmod +x /usr/local/bin/bitcurator

RUN groupadd -r bcadmin && \
useradd -r -g bcadmin -d /home/bcadmin -s /bin/bash -c "BitCurator User" bcadmin && \
mkdir /home/bcadmin && \
chown -R bcadmin:bcadmin /home/bcadmin && \
usermod -a -G sudo bcadmin && \
echo 'bcadmin:bcadmin' | chpasswd

RUN DEBIAN_FRONTEND=noninteractive sudo bitcurator install --mode=addon --user=bcadmin --version=${BITCURATOR_VERSION}
RUN rm -rf /var/cache/salt/* && \
rm -rf /srv/* && \
rm -rf /root/.cache/*

WORKDIR /home/bcadmin

RUN mkdir /var/run/sshd
EXPOSE 22
CMD ["/usr/sbin/sshd", "-D"]