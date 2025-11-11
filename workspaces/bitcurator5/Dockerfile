# Originally from "https://github.com/BitCurator/bitcurator-docker/blob/main/Dockerfile.noble"
# For a working Docker image see "https://hub.docker.com/repository/docker/squirrelworksllc/bitcurator5"

#############################################
FROM kasmweb/kasmweb/ubuntu-noble-desktop
USER root
ENV HOME=/home/kasm-default-profile
ENV STARTUPDIR=/dockerstartup
ENV INST_SCRIPTS=$STARTUPDIR/install
WORKDIR $HOME


######### Bitcurator Container Customizations ###########

# Step 1 - Download and prep Bitcurator CLI
RUN apt-get update && apt-get -y
RUN apt-get install nano build-essential gcc make perl dkmswget curl gnupg sudo -y
RUN curl -Lo /tmp wget https://github.com/BitCurator/bitcurator-cli/releases/download/v2.0.0/bitcurator-cli-linux
RUN chmod +x /tmp/bitcurator-cli-linux



#TODO - Need to set the user to kasm (who is that anyway?)
#       then execute all these as Kasm so the menus and such appear AS Kasm
#       then add Kasm to proper groups AND as root
#       be sure the workspace's settings are to run as root when I get that far!

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