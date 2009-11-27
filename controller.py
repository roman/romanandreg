#!/usr/bin/python
import os, sys
from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
from google.appengine.ext.webapp import template

# We load the vendors folder...
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), 'vendor')))
import twitter

class MainPage(webapp.RequestHandler):
  def get(self):
    view = os.path.join(os.path.dirname(__file__), 'index.html')
    self.response.out.write(template.render(view, {}))



# class TwitterTimeline(webapp.RequestHandler):
#   def get(self):
#     api = twitter.Api('romanandreg', '')
#     api.SetCache(None)
#     timeline = api.GetUserTimeline('romanandreg')[0:10]
#     view = os.path.join(os.path.dirname(__file__), 'twitter.html')
#     keys = {
#       'timeline': timeline,
#     }
#     self.response.out.write(template.render(view, keys))

  
application = webapp.WSGIApplication(
                                    [('/', MainPage),
                                     ('/twitter', TwitterTimeline)])

def main():
  run_wsgi_app(application)

if __name__ == "__main__":
  main()