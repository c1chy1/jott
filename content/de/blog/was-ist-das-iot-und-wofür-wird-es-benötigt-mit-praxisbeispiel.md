---
id: 1
title: <b class="text-(--color-jm-primary-brown) uppercase">Was ist das IoT</b><b> und wofür wird es </b> <b class="text-(--color-jm-primary-brown) uppercase">benötigt</b><b> – mit Praxisbeispiel </b>
seoTitle: Was ist das IoT und wofür wird es benötigt – mit Praxisbeispiel
description: Das Internet of Things (IoT) bezeichnet ein Netzwerk physischer Objekte („Things“), die mit Sensoren, Software und anderer Technologie ausgestattet sind. Diese Objekte können sich über das Internet mit anderen Geräten und Systemen vernetzen und Daten austauschen.
date: 2024-06-21
author: Jonathan
slug: what-is-it-and-what-is-it-needed-for-with-practical-examples
categories:
  - Allgemein
  - Entwicklung
image: /images/Internet-of-Things-(IoT).jpeg
imageAlt: Das Internet of Things (IoT)
---

## Hello World: Kickstart in die IoT-Welt

Viele Geräte des alltäglichen Lebens sind bereits vernetzt, egal ob die Kaffeemaschine, die Waschmaschine oder unser
Auto. Wir sind es gewohnt, dass moderne Produkte Informationen digital auf unserem Handy bereitstellen oder intelligent
diese weiterarbeiten können. Obwohl wir jeden Tag in dieser Welt unterwegs sind, ist der Begriff IoT noch relativ
unbekannt.

Kurz gesagt: IoT ist der Oberbegriff für die Art und Weise der Kommunikation zwischen mehreren Geräten, die gegenseitig
Daten konsumieren oder Befehle absetzen beziehungsweise Inhalte bereitstellen. Dies kann in der Praxis eine App sein,
die der Kaffeemaschine die Anweisung gibt, einen Kaffee zu brühen oder ein intelligentes Thermometer, welches
automatisch der Heizung mitteilt, dass sie eingeschaltet oder abgeschaltet werden soll: Stichwort Automatisierung.

## Wieso, weshalb: Die Technik hinter IoT

Welche Technik genutzt wird, kann pauschal nicht gesagt werden, da IoT erstmal nur der Obergriff ist. Grundsätzlich gibt
es aber immer ein Netzwerk, z.B. das Narrowband welches auf der 4G Technologie basiert und ein anderes Frequenzband
nutzt, als unser Smartphone. Dieses Frequenzband ist optimiert für eine bessere Reichweite (Durchdringung), hingegen es
aber in der Geschwindigkeit langsamer ist. Bedingt dadurch, dass IoT-Geräte keine großen Daten verschicken, sondern eher
kleine Signale, wie z.B. "Kaffeemaschine starten", ist dieser Kompromiss optimal. Wichtiger ist, dass jedes IoT-Gerät
einen perfekten Empfang besitzt, um die stabile Kommunikation zu gewährleisten. Kein Kaffee am Morgen ist auch keine
Lösung.

Natürlich gibt es für IoT-Geräte entwickelte Protokolle, die noch effizienter Daten übertragen können, wie z.B. MQTT.
Mikrocontroller und Hardware werden speziell für IoT-Anwendungsgebiete entwickelt. Alles mit dem Ziel, Daten möglichst
schnell, effizient und vor allem beständig übertragen zu können.

Grundsätzlich kann man sagen, alle Geräte, die autark miteinander kommunizieren können, gehören in diesen Bereich. Die
vermeintliche Intelligenz, die wir als Menschen wahrnehmen, wenn der Staubsauger sich morgens automatisch erst einen
Kaffee brüht, beruht auf die Vernetzung dieser Geräte und die damit verbundene Automatisierung.

## Beispiel Fallenmelder: Schluss mit der abstrakten Theorie

Gelernt haben wir, wofür IoT steht und wie es theoretisch arbeitet beziehungsweise was im Kern der Mehrwert ist.
Allgemein ist es aber vielleicht immer noch recht schwer zu greifen, da alles etwas abstrakt wirkt. Daher gibt es jetzt
hier ein Beispiel.

Nehmen wir an, wir möchten einen Fallenmelder bauen, der automatisch über einen Magnetschalter unserem Server ein Signal
schickt, sobald dieser ausgelöst wurde. Sprich, wird die Falle ausgelöst, wird über ein Seil ein Magnet von unserem
IoT-Gerät abgerissen.

### Was brauchen wir dafür?

- Wasserdichtes Gehäuse
- Akku für die Stromversorgung
- Mikrocontroller mit IoT-NB Support
- IoT-NB Simkarte
- Magnetschalter
- Server

Wir brauchen natürlich ein Gehäuse, welches platzsparend sein sollte, aber auch genug Raum bietet, für unsere Hardware –
daher ist auch zu empfehlen, erst die Hardware kompakt aufzubauen, um dann anschließend das perfekte Gehäuse zu finden
oder dies selber im 3D-Drucker herzustellen.

Da unser Fallenmelder natürlich autark laufen soll, brauchen wir einen Akku, der den Mikrocontroller mit Strom versorgt.
Oftmals wird min. 3,7 V - 5 V benötigt – daher wären normale Batterien möglich, hier ist aber darauf zu achten, dass
genügend mAh zur Verfügung stehen, damit nicht jeder zweite Tag die Batterien getauscht werden müssen. Wer sich mit dem
Thema Stromversorgung beschäftigt, wird schnell feststellen, dass dies oft das Nadelöhr ist.

Das Herzstück ist natürlich der richtige Mikrocontroller. Für Einsteiger ist die Arduino Plattform zu empfehlen. Diese
bietet eine eigene IDE, mit dem wir den Programmiercode direkt auf den Mikrocontroller übertragen und debuggen kann.
Arduino bietet sehr viele Anleitungen und diverse Boards für verschiedene Anwendungszwecke.

In unserem Fall muss das Board eine IoT-NB Simkartenslot besitzen, da wir den Fallenmelder natürlich an einem diversen
Ort einsetzen wollen, an dem es kein WLAN gibt. Theoretisch kann auch ein IoT-NB Shield auf dem Mikrocontroller
zusätzlich installiert werden – einfacher ist es aber, wenn der Mikrocontroller dies bereits besitzt.

Folgend müssen wir nur noch den Magnetschalter an einem digitalen Signal PIN auf unserem Mikrocontroller legen und mit
Strom versorgen. Ist ein Magnet nun in der Nähe und schließt damit den Stromkreis, erhält der PIN den Status "1" – ist
der Magnet abgezogen durch das Auslösen unserer Falle, erhalten wir an dem PIN eine "0". Dies können wir über unseren
Programmiercode auslesen.

Folgend können wir das Signal jetzt über ein HTTP Request an unseren Server schicken und dort weiter verarbeiten. Hier
bietet sich ein Headless CMS mit einer RESTful-API an, z.B. Directus. Das Signal wird vom Server verarbeitet und weitere
Aktionen eingeleitet. Zum Beispiel ein Push an euer Handy geschickt oder die genaue Zeit und der Ort notiert.

## Overall: IoT ist zugänglich

An dem Beispiel des Fallenmelders hat man gesehen, das IoT nicht nur ein Industriethema ist, sondern jeder mitwirken
kann und für seine eigenen Bedürfnisse, mit wenig Geld und ein bisschen technischen Verständnis, umsetzen kann. ✌️
