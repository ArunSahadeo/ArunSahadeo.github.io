---
layout: post
title: "Subnetting Maths"
date: 2021-11-07 18:47:38
description: >-#
excerpt: >-#
  Learn why we use the digits we do in the subnet mask, broadcast and network addresses, and how we calculate the number of usable IPs.
featured_image:
  filename: '/assets/img/featured/categories/networking.jpg'
  alt: 'Networking'
categories: 
  - networking
---
### What is the subnet mask?

The subnet mask is used to identify which octets in an IP address are reserved to the network and are immutable, and which octets belong to the host and can thus be changed / are not fixed.

So for example, if you take the following subnet mask:

255.255.255.0

Then the first three octets of the IP address are reserved to the network, and the fourth and final octet is the host section.

### What is the network address?

The network address is used for identifying the parts of an IP address that are reserved to the network, and can be used to identify the subnet.

### What is the broadcast address?

Addresses all of the devices in the target network simultaneously.

### Converting an IP address into binary form

To calculate the subnet mask, network address, broadcast address and the range of IP addresses that can be assigned in a subnet, by scratch, requires a multi pronged solution.

First, we must consider our prerequisites:

1. The IP address we will be using as an example
2. The CIDR / routing prefix (the decimal value that comes after the slash suffixing the IP address)

We will use 10.88.135.144/28 as an example (the default value on https://cidr.xyz)

First we will need to convert the four digits in the IP address (we are excluding the number that comes after the slash) into their binary equivalents.

The base-10 numbering system is pretty easy to grasp - 0 is 0, 1 is 1, 2 is 10, etc.

What you are doing is checking if the place value of the digit is 1, and if so, you change the decimal unit, so that 3 is equal to 11, 4 becomes 100, 5 becomes 101, and so on.

So 10 in binary form becomes 1010, and because there are 8 bits (single digits whose only values can be 0 or 1) in an octet, we prefix 1010 with 0000 to form our octet.

However, for numbers greater than 16, we will need to perform an operation known as binary division, which can be shown with the second decimal number in our given IP address, 88, as follows:

**88 / 2 = 44 (this becomes 0, as there is no remainder)**

**44 / 2 = 22 (again, 0, as no remainder)**

**22 / 2 = 11 (0, as before)**

**11 / 2 = 5.5 (1, as there is a remainder, which we will strip from 5 so that we can divide it as below)**

**5 / 2 = 2.5 (again 1, due to there being a remainder)**

**2 / 2 = 1 (0, no remainder)**

**1 / 2 = 0.5 (1, as there is a remainder)**

We stop our binary division operation once the quotient is equal to 0.

Since 88 has no fractional value, we start building our octet by beginning with the last result (i.e. the 1 we derived as our binary or truthy value from dividing 1 by 2) and ending with the first result.

From this, we derive 1011000, and since it is only 7 digits long, we prefix 0 to this, leaving us with a final value of 01011000.

Following suit for 135 and 144 produces 10000111 and 10011010 respectively.

## Our IP address in binary form

0000 1010 (10 in binary form) - 0101 1000 (88 in binary form) - 1000 0111 (135 in binary form) - 1001 1010 (144 in binary form)

### Calculating the subnet mask

Now that we have converted our IP address into binary form, we can move onto an easier task.

Take note of our example IP address's CIDR prefix, i.e. /28.

To calculate the subnet mask, it is worth noting that IP addresses are 32 bits long.

Calculating the subnet mask is a matter of working out how many 1s and how many 0s it consists of.

The number of 1s is equal to the CIDR prefix, in our case 28, whereas the number of 1s is equal to 32 minus the CIDR prefix which, given that ours is 28, equals 4.

So the subnet mask is 

11111111 11111111 11111111 11110000

Now, to convert these four binary octets to denary, we need to do as follows:

1. For each digit, multiply it by 2 to the power of the current length of the octet, i.e. 8, minus the position of the digit - In the case of the first digit in an octet, this would be 1 * 2⁷
2. Sum all the results to get your denary number or value

So if we take the first octet as an example, here is how it would look:

- **(1 * 2⁷) + (1 * 2⁶) + (1 * 2⁵) + (1 * 2⁴) + (1 * 2³) + (1 * 2²) + (1 * 2¹) + (1 * 2⁰)**
- **128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 (remember that any number raised to an exponent of 0 equals 1)**
- **255**

So the first three octets in our subnet mask are equal to 255.

For the last octet, 11110000, this would be:

- **(1 * 2⁷) + (1 * 2⁶) + (1 * 2⁵) + (1 * 2⁴) + (0 * 2³) + (0 * 2²) + (0 * 2¹) + (0 * 2⁰)**
- **128 + 64 + 32 + 16**
- **240**

So our subnet mask, if the CIDR or routing prefix is **/28**, is equal to 255.255.255.240.

Now onto the rest...

**Calculating the network and broadcast address**

Remember our IP address in binary form:

```
0000 1010 (10 in binary form) - 0101 1000 (88 in binary form) - 1000 0111 (135 in binary form) - 1001 1010 (144 in binary form)
```

So to calculate the network address, given that our CIDR prefix is **/28**, the network address consists of the first X bits of our IP address in binary form, where X equals the CIDR prefix (28 in our case), followed by 0s.

Conversely, the broadcast address will also be the first 28 bits, followed by 1s.

So we have the following:

Network address: 0000 1010 0101 1000 1000 0111 1001 0000

Which, when converted into denary form, becomes 10.88.135.144

Broadcast address: 0000 1010 0101 1000 1000 0111 1001 1111

Which, when converted into denary form, becomes 10.88.135.159

So to recap, for 10.88.135.144/28, we have the following:

Network address: **10.88.135.144**

Broadcast address: **10.88.135.159**

Onto the last part.

## Calculating the number of usable IPs

The formula for calculating this is simple.

```
2^(32 - 28) - 2
```

We subtract our CIDR prefix of 28 from 32, i.e. the total number of bits in an IP address, giving us 4.

We raise 2 to the power of 4 to show us the total number of IP addresses we can have, as there are two possibilities for each bit, i.e. 1 or 0.

We then subtract two from this result, as neither the network nor the broadcast address can be assigned to devices in the network.

So with 2⁴ being equal to 16, we have 16 IP addresses in total, with 2 of those being reserved for use by the network, giving us 14 IP addresses overall that can be assigned to network devices.

And since 10.88.135.144, the first IP in our hypothetical subnet, is reserved for use, the first usable IP is 10.88.135.145.

Conversely, the last IP in our hypothetical subnet, 10.88.135.159, is also reserved, meaning that the last usable IP is 10.88.135.158.
