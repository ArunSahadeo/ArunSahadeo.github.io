# Setup

## RVM

I use RVM (Ruby Version Manager) to manage the Ruby version, 2.7.8, I use to develop this site locally.

Installation instructions for RVM / Ruby 2.7.8 are as follows:

```
curl -sSL https://get.rvm.io | bash -s stable --ruby
rvm pkg install openssl
rvm install ruby-2.7.8 --with-openssl-dir=$HOME/.rvm/usr
rvm use 2.7.8
```

UPDATED:

Using Ruby 3.4.5.

## Installing gems / dependencies

Installation instructions (once the instructions for **RVM** are executed) are as follows:

```
gem install bundler
bundle install
```

## Running Jekyll locally

```
bundle exec jekyll serve
```

## Creating new posts

```
thor jekyll:new_post --title *TITLE HERE* --categories *CATEGORIES HERE*
```

## Creating new projects

```
thor jekyll:new_project *CATEGORIES HERE*
```

## Creating new tags

```
thor jekyll:tag *TITLE HERE*
```
