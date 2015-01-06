var usb         = require('usb'),
    _           = require('underscore'),
    async       = require('async');

//usb.setDebugLevel(4);

function RocketLauncher()
{
  this.launcher_device = null;

  this.commands = {
    'down'        :   0x01,
    'up'          :   0x02,
    'left'        :   0x04,
    'right'       :   0x08,
    'shoot'       :   0x10,
    'stop'        :   0x20,
    'boom'        :   0x40
  };

  this.acquireDevice = function()
  {
    var launcher_device = usb.findByIds(6465, 32801);
    this.launcher_device = launcher_device;
  }

  this.runCommand = function(command)
  {
    console.log('Command is "'+ command +'"');

    if(this.commands[command])
    {
      signal = this.commands[command];
    }
    else
    {
      signal = eval(command);
    }

    this.launcher_device.controlTransfer(0x21, 0x09, 0x200, 0x00, new Buffer([signal, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]), 
      function (data) {
        console.log(data);
      }
    );

    return command;

  };


  this.quit = function() {
    this.launcher_interface.release(
    function(data) {
      console.log('released')
      process.exit();
    });
  }


  this.init = function()
  {
    this.acquireDevice();

    this.launcher_device.open();

    this.launcher_interface = this.launcher_device.interfaces[0];

    if (this.launcher_interface.isKernelDriverActive()) {
      this.launcher_interface.detachKernelDriver();
    }
    //this.launcher_interface.claim();
  };

  this.init();
}

exports.RocketLauncher = RocketLauncher;