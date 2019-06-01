require 'rails_helper'

RSpec.describe Activity, type: :model do
  it { should have_valid(:name).when("Family Show Practice") }
  it { should_not have_valid(:name).when(nil, "") }

  it { should have_valid(:type).when("Practice", "Show", "Class") }
  it { should_not have_valid(:type).when(nil, "") }

  it { should have_valid(:date).when("Wed, 29 May 2019", "22-2-2010", "2019-2-22") }
  it { should_not have_valid(:date).when(nil, "", "2-22-1999") }

  it { should have_valid(:duration).when(1, 1.5, 0.5, "1.5", 100, 0.75) }
  it { should_not have_valid(:duration).when(nil, "", "1.5.1", "one hour", 0, -1, -1.5) }


end
