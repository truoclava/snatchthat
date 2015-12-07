# Users
User.create!(username:  "Example User",
             email: "example@railstutorial.org",
             password:              "foobarfoobar",
             password_confirmation: "foobarfoobar")

99.times do |n|
  name  = Faker::Name.name
  email = "example-#{n+1}@railstutorial.org"
  password = "password"
  User.create!(username: name,
              email: email,
              password:              password,
              password_confirmation: password)
end


# Following relationships
users = User.all
user  = users.first
following = users[2..50]
followers = users[3..40]
following.each { |followed| user.follow(followed) }
followers.each { |follower| follower.follow(user) }