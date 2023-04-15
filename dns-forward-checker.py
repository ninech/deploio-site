#!/usr/bin/python3
# tom - 14.04.2023

import dns.resolver
import requests

# Set the IP address of the DNS resolver to use
resolver_ip = '8.8.8.8'
resolver_ip = '217.150.241.4'
main_domain = 'deplo.io'
aliasses = [ "deplo.ch", "deploio.app", "deploio.ch", "deploio.com", "deploio.io", "deployo.ch"]

# Create a resolver object and set the nameserver to use
resolver = dns.resolver.Resolver()
resolver.nameservers = [resolver_ip]

print("Settings for deplo.io:\n")

cname_subdomain = main_domain + "."
a_record = resolver.resolve(main_domain, 'A')[0]
aaaa_record = resolver.resolve(main_domain, 'AAAA')[0]
print("A:    @    " + str(a_record))
print("A:    www  " + str(resolver.resolve("www." + main_domain, 'A')[0]))
print("AAAA: @    " + str(aaaa_record))
print("AAAA: www  " + str(resolver.resolve("www." + main_domain, 'AAAA')[0]))
print("")

def check_dns(domain):
    try:
        answers = resolver.resolve(domain, 'A')
        if str(answers[0]) != str(a_record):
            print(f"ERR: A record for {domain} is incorrect, it is {answers[0]} and not {a_record}")
            return False
    except:
        print(f"ERR: A record for {domain} is missing or incorrect")
        return False

    try:
        answers = resolver.resolve(domain, 'AAAA')
        if str(answers[0]) != str(aaaa_record):
            print(f"ERR: AAAA record for {domain} is incorrect")
            return False
    except:
        print(f"ERR: AAAA record for {domain} is missing or incorrect")
        return False

    try:
        answers = resolver.resolve(f"www.{domain}", 'CNAME')
        if str(answers[0]) != cname_subdomain:
            print(f"CNAME record for www.{domain} is incorrect, it is {answers[0]}")
            return False
    except:
        print(f"ERR: CNAME record for www.{domain} is missing or incorrect")
        return False

    print(f"OK: All DNS records for {domain} are correct")
    return True

def check_redirect(domain):
    tests = []
    tests.append('https://')
    tests.append('https://www.')
    tests.append('http://')
    tests.append('http://www.')

    for test in tests:
      # Make a GET request to the URL
      target_url = 'https://' + main_domain + '/'
      url = test + domain

      try:
        response = requests.get(url, allow_redirects=False)

        # Check if the response is a 301 redirect
        if str(response.status_code) == str(301):
            # Check if the redirect location matches the target URL
            if str(response.headers.get('Location')) == str(target_url):
                print(f"OK: {url} forwards to {target_url} with a 301 status code")
                continue
      except:
        pass
      
      # If we didn't find a redirect or the redirect didn't match, print an error message
      print(f"ERR: {url} does NOT forward to {target_url}")
      return False

# Check the DNS records for each domain and subdomain
for alias in aliasses: 
 check_dns(alias)

for alias in aliasses: 
 check_redirect(alias)


