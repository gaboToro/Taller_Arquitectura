################################################################################################
####################################### CLIENTE MQTT ###########################################
################################################################################################
import random
import json
import time
from paho.mqtt import client as mqtt_client

import smtplib

import psutil

# Local
# BROKER = 'localhost'
# PORT = 1883
# 0TOPIC = "/test"
# generate client ID with pub prefix randomly
# CLIENT_ID = "python-mqtt-tcp-pub-sub-{id}".format(id=random.randint(0, 1000))
# USERNAME = 'admin'
# PASSWORD = 'public'
# FLAG_CONNECTED = 0

# Hive
BROKER = 'broker.hivemq.com'
PORT = 1883
TOPIC_DATA = "gabito"
TOPIC_ALERT = "gabito"
# generate client ID with pub prefix randomly
CLIENT_ID = "python-mqtt-tcp-pub-sub-{id}".format(id=random.randint(0, 1000))
FLAG_CONNECTED = 0

smtp_server = 'smtp.gmail.com'
smtp_port = 587
sender_email = 'gabrietoroc@gmail.com'
sender_password = 'zjaappmzoaeokzid'
recipient_email = 'gabrietoro@yahoo.com'


def on_connect(client, userdata, flags, rc):
    global FLAG_CONNECTED
    if rc == 0:
        FLAG_CONNECTED = 1
        print("Connected to MQTT Broker!")
        client.subscribe(TOPIC_DATA)
        client.subscribe(TOPIC_ALERT)
    else:
        print("Failed to connect, return code {rc}".format(rc=rc), )


def on_message(client, userdata, msg):
    # print("Received `{payload}` from `{topic}` topic".format(payload=msg.payload.decode(), topic=msg.topic))
    try:
        print("Received `{payload}` from `{topic}` topic".format(payload=msg.payload.decode(), topic=msg.topic))
        publish(client, TOPIC_ALERT)

    except Exception as e:
        print(e)


def connect_mqtt():
    client = mqtt_client.Client(CLIENT_ID)
    # client.username_pw_set(USERNAME, PASSWORD)
    client.on_connect = on_connect
    client.on_message = on_message
    client.connect(BROKER, PORT)
    return client


# Enviar mensajes
def publish(client, TOPIC, msg):
    msg = json.dumps(msg)
    result = client.publish(TOPIC, msg)

client = connect_mqtt()

def enviar_correo():
    subject = 'Alerta de mensajes'
    body = 'Hola'

    message = f'Subject: {subject}\n\n{body}'

    with smtplib.SMTP(smtp_server, smtp_port) as server:
        server.starttls()
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, recipient_email, message)

def enviar_correo2():
    subject = 'Alerta de rendimiento del PC'
    body = f'El rendimiento del PC es del {get_cpu_usage()}%. Se recomienda verificar el estado del sistema.'


    message = f'Subject: {subject}\n\n{body}'

    with smtplib.SMTP(smtp_server, smtp_port) as server:
        server.starttls()
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, recipient_email, message)


def get_cpu_usage():
    # Obtener el porcentaje de uso de la CPU
    cpu_usage = psutil.cpu_percent(interval=1)
    return cpu_usage

def get_cpu_memory_usage():
    # Obtener el porcentaje de uso de memoria de la PC
    return psutil.virtual_memory().percent

def get_disk_usage():
    # Obtener el porcentaje de uso del disco duro del PC
    return psutil.disk_usage('/').percent

def get_cache_usage():
    # Obtener el porcentaje de uso del disco duro del PC
    return round(100 - psutil.virtual_memory().available / psutil.virtual_memory().total * 100, 2)


def run():
    client = connect_mqtt()
    contador = 1
    while True:
        client.loop_start()
        time.sleep(1)

        if FLAG_CONNECTED:
            # print("Wait for message...")
            #publish(client, TOPIC_DATA, {'valueCPU': get_cpu_usage()})
            #publish(client, TOPIC_DATA, {'value': get_cpu_memory_usage()})
            #publish(client, TOPIC_DATA, {'value':get_disk_usage()})
            #publish(client, TOPIC_DATA, get_temperature())
            #publish(client, TOPIC_DATA, {'valueCPU': get_cpu_usage()})

            dato = {
                'CPU': get_cpu_usage(),
                'Memory': get_cpu_memory_usage(),
                'Disk': get_disk_usage(),
                'Cache': get_cache_usage()
            }

            grftodo = json.dumps(dato)
            publicar = client.publish("gabito", grftodo)

            publish(client, TOPIC_DATA, contador)
            contador += 1
            if contador % 10 == 0:
                publish(client, TOPIC_DATA, "SE HUBIERA MANDADO E-MAIL")
                #enviar_correo()

            if get_cpu_usage()>40:
                enviar_correo2()

        else:
            client.loop_stop()


if __name__ == '__main__':
    run()