# == Schema Information
#
# Table name: prices
#
#  id         :integer          not null, primary key
#  price      :string
#  item_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

FactoryGirl.define do
  factory :price do
    
  end

end
