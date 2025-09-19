---
id: 1
title: <b class="text-(--color-jm-primary-brown) uppercase">What is this IoT</b> <b> and what it is used for </b> <b class="text-(--color-jm-primary-brown) uppercase">needed</b> <b> – with practical example </b>
seoTitle: What is the IoT and what is it needed for - with practical example
description: The Internet of Things (IoT) refers to a network of physical objects (‘things’) that are equipped with sensors, software and other technology. These objects can network with other devices and systems via the internet and exchange data.
date: 2024-06-21
author: Jonathan
slug: what-is-it-and-what-is-it-needed-for-with-practical-examples
categories:
  - General
  - Development
image: /images/Internet-of-Things-(IoT).jpeg
imageAlt: Das Internet of Things (IoT)
---

## Hello World: Kickstart into the IoT world

Many everyday devices are already networked, whether it's the coffee machine, the washing machine or our car.
car. We are used to modern products providing information digitally on our mobile phones or being able to intelligently
can continue to work on them. Although we are out and about in this world every day, the term IoT is still relatively
unknown.
still relatively unknown.

In short: IoT is the generic term for the way in which multiple devices communicate with each other, consume data or
send commands.
consume data or send commands or provide content. In practice, this can be an app,
that instructs the coffee machine to brew a coffee or a smart thermometer that automatically tells the heating
automatically informs the heating that it should be switched on or off: Keyword automation.

## Why, why: the technology behind IoT

It is not possible to generalize about which technology is used, as IoT is only the generic term. In principle, however
network, e.g. the narrowband, which is based on 4G technology and uses a different frequency band than our smartphone.
than our smartphone. This frequency band is optimized for a better range (penetration), but is slower in speed.
however, it is slower in terms of speed. Due to the fact that IoT devices do not send large data, but rather small
signals, such as
small signals, such as ‘start coffee machine,’ this compromise is optimal. It is more important that every IoT device
has perfect reception to ensure stable communication. No coffee in the morning is not a
solution either.

Of course, there are protocols developed for IoT devices that can transmit data even more efficiently, such as MQTT.
Microcontrollers and hardware are being developed specifically for IoT applications. All with the aim of transferring
data as quickly, efficiently and, above all, consistently as possible.

Basically, you can say that all devices that can communicate with each other autonomously belong in this area. The
intelligence that we as humans perceive when the hover automatically brews a coffee in the morning is based on the
coffee in the morning is based on the networking of these devices and the associated automation.

## Example of trap detectors: No more abstract theory

We have learnt what IoT stands for and how it works in theory and what the core added value is.
In general, however, it is perhaps still quite difficult to grasp, as everything seems somewhat abstract. That's why
there is now
here is an example.

Let's assume we want to build a trap detector that automatically sends a signal to our server via a magnetic switch as
soon as it is triggered.
as soon as it is triggered. In other words, if the trap is triggered, a magnet is pulled off our
IoT device via a rope.

### What do we need for this?

- Waterproof housing
- Battery for the power supply
- Microcontroller with IoT-NB support
- IoT-NB sim card
- Magnetic switch
- Server

Of course, we need an enclosure that should be space-saving, but also offer enough room for our hardware.
It is therefore also advisable to first build the hardware compactly and then find the perfect housing
or produce it yourself using a 3D printer.

As our trap alarm should of course run independently, we need a battery to supply the microcontroller with power.
Often at least 3.7 V - 5 V is required - so normal batteries would be possible, but here you have to make sure that
sufficient mAh are available so that the batteries do not have to be replaced every second day. Anyone who deals with
the
power supply will quickly realize that this is often a bottleneck.

The centerpiece is, of course, the right microcontroller. The Arduino platform is recommended for beginners. This
offers its own IDE with which we can transfer the programming code directly to the microcontroller and debug it.
Arduino offers many instructions and various boards for different applications.

In our case, the board must have an IoT-NB SIM card slot, as we naturally want to use the trap detector in a diverse
place where there is no WLAN. Theoretically, an IoT-NB shield can also be installed on the microcontroller
can also be installed - but it is easier if the microcontroller already has this.

Next, we just need to connect the magnetic switch to a digital signal PIN on our microcontroller and supply it with
power supply. If a magnet is now in the vicinity and thus closes the circuit, the PIN receives the status ‘1’ - if the
magnet is
If the magnet is removed by triggering our latch, we receive a ‘0’ at the PIN. We can read this via our
programming code.

We can then send the signal to our server via an HTTP request and process it there. Here
a headless CMS with a RESTful API, e.g. Directus. The signal is processed by the server and further
actions are initiated. For example, a push is sent to your mobile phone or the exact time and location is noted.

## Overall: IoT is accessible

The example of the trap detector shows that IoT is not just an industry topic, but that everyone can get involved
and can implement it for their own needs with little money and a little technical understanding. ✌️