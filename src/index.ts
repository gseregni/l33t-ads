import { Socket, io } from "socket.io-client";

var ads = require('ads-client')



export class ADSClient {

    client: any
    socket?: Socket;
    constructor(params:object) {
      this.connectSocketIO()  
      this.client  = new ads.Client(params)
        
    }

    connectSocketIO() {
      this.socket = io("http://192.168.30.212:1337");

      // client-side
      this.socket.on("connect", () => {
        console.log("CONNECT",this.socket?.id); // x8WIv7-mJelg7on_ALbx
      });

      this.socket.on("disconnect", () => {
        console.log(this.socket?.id); // undefined
      });

     // this.socket.connect()
    }


    async connect() {
      return await this.client.connect()
    }

    disconnet() {

    }


    async registerVariable(name:string) {
        let r = await this.client.subscribe(name, (x:{value:any, timeStamp:Date, type:{}}) => {
          if (this.socket) {

            
            this.socket.emit("status_update", {id:10, data: {variable: name, value: x.value}, timestamp: x.timeStamp.getTime()})
            console.log("callback ",x.value.value, x.timeStamp)
          }
        }, 1, true) 

        //console.log("register variable", r)

    }

    unregisterVariable(name:string) {

    }


}

let params = {
    localAmsNetId: '172.19.160.1.1.1',  //Can be anything but needs to be in PLC StaticRoutes.xml file
    //localAdsPort: 32750,                //Can be anything that is not used
    targetAmsNetId: '192.168.30.180.1.1',
    targetAdsPort: 851,
    //routerAddress: '192.168.30.180',     //PLC ip address
    //routerTcpPort: 48898                //PLC needs to have this port opened. Test disabling all firewalls if problems
  }
let client  = new ADSClient(params)

client.connect().then(x => {
  client.registerVariable("RULLI_CENTRO_TAGLI.RD_Levigatrice_Act_Speed")
})

/* const client = new ads.Client()

  client.connect()
  .then(async (res:any) => {   
    console.log(`Connected to the ${res.targetAmsNetId}`)
    console.log(`Router assigned us AmsNetId ${res.localAmsNetId} and port ${res.localAdsPort}`)

    var resu = await client.readAndCacheSymbols()
    
    Object.keys(resu).forEach(k => {
        console.log('Symbols:', resu[k].name)
    })
    return client.disconnect()
  })
  .then(() => {
    console.log('Disconnected')
  })
  .catch((err:any) => {
    console.log('Something failed:', err)
  })   */

/* 
var options = {
    //The IP or hostname of the target machine
    host: "192.168.30.180",
    //The NetId of the target machine
    amsNetIdTarget: "192.168.30.180.1.1",
    //The NetId of the source machine.
    //You can choose anything in the form of x.x.x.x.x.x,
    //but on the target machine this must be added as a route.
    amsNetIdSource: "172.19.160.1.1.1",

    //OPTIONAL: (These are set by default)
    //The tcp destination port
    //port: 48898
    //The ams source port
    //amsPortSource: 32905
    //The ams target port for TwinCat 2 Runtime 1 
    amsPortTarget: 851 
    //The ams target port for TwinCat 3 Runtime 1
    //amsPortTarget: 851 
    //The timeout for PLC requests
    //timeout: 500
    //The Local address the socket should connect from
    //localAddress: "192.168.137.50"
    //The Local port the socket should connect from
    //localPort: 50000
    //Version of IP stack. Must be 4, 6, or 0. The value 0 indicates that both IPv4 and IPv6 addresses are allowed. Default: 0
    //family: 4
}

var client = ads.connect(options, function() {
    this.readDeviceInfo(function(err, result) {
        if (err) console.log(err)
        console.log(result)
        this.end()
    })
})

client.on('error', function(error) {
    console.log(error)
})
 */