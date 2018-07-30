# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

roland = User.create(name: 'Roland', username: 'roland', password: 'whale', password_confirmation: 'whale', age: 45, total_recording_hours: 100)
evan = User.create(name: 'Evan', username: 'evan', password: 'evermore', password_confirmation: 'evermore', age: 12, total_recording_hours: 5)
bracken = User.create(name: 'Bracken', username: 'bracken', password: 'techie', password_confirmation: 'techie', age: 23, total_recording_hours: 50)
swaine = User.create(name: 'Swaine', username: 'swaine', password: 'thief', password_confirmation: 'thief', age: 34, total_recording_hours: 20)
tani = User.create(name: 'Tani', username: 'tani', password: 'sky', password_confirmation: 'sky', age: 13, total_recording_hours: 15)

OUAT = Show.create(name: 'Once Upon a Time', req_recording_hours: 30, req_age: 18, description: 'Show about Fairy Tale characters in a fictional town.')
Supergirl = Show.create(name: 'Supergirl', req_recording_hours: 15, req_age: 15, description: 'The story of Kara Danvers as Supergirl.')
TaJ = Show.create(name: 'Tom and Jerry', req_recording_hours: 5, req_age: 10, description: 'The adventures of an animated cat and mouse.')

emma = Character.create(name: 'Emma', show: OUAT, role:'hero', description:'The Savior')
regina = Character.create(name: 'Regina', show: OUAT, role:'anti-hero', description:'The Evil Queen')
henry = Character.create(name: 'Henry', show: OUAT, role:'hero', description:'The Author')
alex = Character.create(name: 'Alex', show: Supergirl, role:'hero', description:'DEO Agent')
kara = Character.create(name: 'Kara', show: Supergirl, role:'hero', description:'Supergirl')
lena = Character.create(name: 'Lena', show: Supergirl, role:'anti-hero', description:'CEO of L-Corp')
tom = Character.create(name: 'Tom', show: TaJ, role:'cat', description:'chases Jerry')
jerry = Character.create(name: 'Jerry', show: TaJ, role:'mouse', description:'chased by Tom')

recording1 = Recording.create(user: roland, show: OUAT, name: "Roland OUAT")
recording2 = Recording.create(user: roland, show: Supergirl, name: "Roland S")
recording3 = Recording.create(user: roland, show: TaJ, name: "Roland TaJ")
recording4 = Recording.create(user: bracken, show: OUAT, name: "Bracken OUAT")
recording5 = Recording.create(user: bracken, show: Supergirl, name: "Bracken S")
recording6 = Recording.create(user: swaine, show: TaJ, name: "Swaine TaJ")
recording7 = Recording.create(user: tani, show: TaJ, name: "Tani TaJ")
