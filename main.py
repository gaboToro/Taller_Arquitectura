################################################################################################ 
####################################### CLIENTE MQTT ########################################### 
################################################################################################

from paho.mqtt import client as mqtt_client
import time
import random
import json
import psutil
import wmi
#Hive
BROKER = 'broker.hivemq.com'
PORT = 1883
TOPIC_DATA = "probar1234"
TOPIC_ALERT = "probar1234"
# generate client ID with pub prefix randomly
CLIENT_ID = "python-mqtt-tcp-pub-sub-{id}".format(id=random.randint(0, 1000))
FLAG_CONNECTED = 0
t=0

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
    #print("Received `{payload}` from `{topic}` topic".format(payload=msg.payload.decode(), topic=msg.topic))
    try:
        print("Received `{payload}` from `{topic}` topic".format(payload=msg.payload.decode(), topic=msg.topic))
        #publish(client,TOPIC_ALERT,"Hola")               

    except Exception as e:
        print(e)

def connect_mqtt():
    client = mqtt_client.Client(CLIENT_ID)
    #client.username_pw_set(USERNAME, PASSWORD)
    client.on_connect = on_connect
    client.on_message = on_message
    client.connect(BROKER, PORT)
    return client

#Enviar mensajes
def publish(client,TOPIC,msg): 
    result = client.publish(TOPIC, msg)

def get_cpu_usage():
    return psutil.cpu_percent(interval=1)
    try:
        temperature = psutil.sensors_temperatures()
        cpu_temperature = temperature['coretemp'][0].current if 'coretemp' in temperature else None
        return cpu_temperature
    except Exception as e:
        print("Error: {e}")
        return None

def get_memory_usage():
    memory = psutil.virtual_memory()
    return memory.percent

def get_disk_usage():
    return psutil.disk_usage('/').percent
    try:
        disk = psutil.disk_usage('/')
        total_disk = disk.total
        used_disk = disk.used
        return total_disk, used_disk
    except Exception as e:
        print(f"Error: {e}")
        return None



def obtener_porcentaje_uso_disco():
    c = wmi.WMI()
    query = "SELECT * FROM Win32_PerfFormattedData_PerfDisk_LogicalDisk WHERE Name='C:'"
    result = c.query(query)
    for item in result:
        return int(item.PercentDiskTime)

#def obtener_porcentaje_uso_disco():
#    particion = 'C:\\'  # Utiliza 'C:\\' para representar la unidad C en Windows
#    uso_disco = psutil.disk_usage(particion)
#    return uso_disco.percent

def run():

    client = connect_mqtt()
    while True:
        client.loop_start()
        if FLAG_CONNECTED:
            cpu_usage = get_cpu_usage()
            memory_usage = get_memory_usage()
            disk_usage = obtener_porcentaje_uso_disco()
            tp = {"CPU": cpu_usage, "Memoria": memory_usage, "Disco": disk_usage}
            msg=json.dumps(tp)
            publish(client,TOPIC_DATA,msg)
           
            time.sleep(1)
        else:
            client.loop_stop()


if __name__ == '__main__':
    run()