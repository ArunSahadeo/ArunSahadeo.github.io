require "optparse"
require "stringex"
class Jekyll < Thor
  desc "new_post", "create a new post"
  method_option :editor, :default => "subl"
  def new_post(*title)
    categories = Array.new

    OptionParser.new do |opts|
      opts.banner = "Usage: thor jekyll:new_post [options]"

      opts.on('--title [title]', 'Specify the post title') do |v|
        title = v

        if v.to_s.strip.empty?
          puts "Title cannot be empty!"
          exit
        end
      end

      opts.on('--categories [categories]', 'Specify the post categories') do |cats|
        if cats.respond_to?(:to_str)
            categories = cats.split(" ")
        end
      end
    end.parse!

    if title.kind_of?(Array)
      title = title.join(" ")
    end

    date = Time.now.strftime('%Y-%m-%d')
    hour = Time.now.strftime('%H:%M:%S')
    filename = "_posts/#{date}-#{title.to_url}.md"

    if File.exist?(filename)
      abort("#{filename} already exists!")
    end

    puts "Creating new post: #{filename}"
    open(filename, 'w') do |post|
      post.puts "---"
      post.puts "layout: post"
      post.puts "title: \"#{title.gsub(/&/,'&amp;')}\""
      post.puts "date: #{date} #{hour}"
      post.puts "description: >-#"
      post.puts "excerpt: >-#"

      unless defined?(categories)
        post.puts "image: '/images/default-thumb.png'"
      else
        if categories.any? { |cat| cat.casecmp('Networking') == 0 }
          post.puts "featured_image:"
          post.puts "  filename: '/assets/img/featured/categories/networking.jpg'"
          post.puts "  alt: 'Networking'"
        end
      end

      if defined?(categories)
        post.puts "categories: "
        for cat in categories do
          post.puts "  - " + cat
        end
      end

      if defined?(tags)
        post.puts "tags: "
      end

      post.puts "---"
    end

    system(options[:editor], filename)
  end

  desc "new_project", "create a new project"
  method_option :editor, :default => "subl"
  def new_project(*title)
    title = title.join(" ")
    filename = "_projects/#{title.to_url}.md"

    if File.exist?(filename)
      abort("#{filename} already exists!")
    end

    puts "Creating new post: #{filename}"
    open(filename, 'w') do |post|
      post.puts "---"
      post.puts "layout: project"
      post.puts "title: \"#{title.gsub(/&/,'&amp;')}\""
      post.puts "description: -Your Description Here-"
      post.puts "project_category: "
      post.puts "---"
    end

    system(options[:editor], filename)
  end

  desc "tag", "create a new tag"
  method_option :editor, :default => "subl"
  def tag(*name)
    tag_name = name.join(" ")
    tag_dasherized_name = tag_name.downcase.split(" ").join("-")
    filename = "tags/#{tag_dasherized_name}.md"

    if File.exist?(filename)
      abort("#{filename} already exists!")
    end

    puts "Creating new tag: #{filename}"
    open(filename, 'w') do |tag|
      tag.puts "---"
      tag.puts "layout: blog_by_tag"
      tag.puts "tag: #{tag_dasherized_name}"
      tag.puts "permalink: /tags/#{tag_dasherized_name}/"
      tag.puts "---"
    end

    puts "Updating tag list"
    open("_data/tags.yml", "a+") do |tag|
      tag.puts ""
      tag.puts "- slug: #{tag_dasherized_name}"
      tag.puts "  name: #{tag_name}"
    end

    system(options[:editor], filename)
  end
end
