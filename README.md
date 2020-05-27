## messages table

|Column|Type|Options|
|------|----|-------|
|body|text|---------|
|image|string|------|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null:false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

## users table

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false, unique: false|
|password|string|null: false|

### Association
- has_many :messages
- has_many :groups, through: :groups_users

## groups table

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :messages
- has_many :users, through: :groups_users

## groups_users table
|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
