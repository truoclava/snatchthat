class Price < ActiveRecord::Base
  belongs_to :item

  def self.check
    Item.all.each do |item|

      current_price = item.get_current_price

      new_price = Price.new(price: current_price)
      item.prices << new_price

      if current_price != item.price
        price_dif = item.price - current_price
        # item.update_item
        Adapters::TwilioMessageClient.new.send_message(price_dif, item)
      else
        # item.update_item
      end
    end
  end
end