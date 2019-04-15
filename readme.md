
- POST, PUT, DELETE requests need a Token in Authorization header `except for /auth/ routes`

sample request
```js
//axios.post(url, bodyData, config)
axios.post('/endpoint', {
	data: value,
	.
	.
	.
}, {
	headers: {
		authorization: token
	}
})
```

# `/auth/`

## POST `/auth/register`

expects in body:
```js
{
	username: string, //required
	address: string, //required
	name: string, //required
	password: string //required
}
```
returned data on success:
```js
{
  prison: {
    id: integer,
    name: string,
    address: string,
    prisoners: []
  },
  token: string
}
```

## POST `/auth/login`

expects in body:
```js
{
	username: string, //required
	password: string, //required
}
```

returned data on success:
```js
{
	prison: {
		id: integer,
		name: string,
		address: string,
		prisoners: [
			{
				id: integer,
				name: string,
				canHaveWorkLeave: boolean //0 - false, 1 - true
			},
			.
			.
			.
		]
	},
	token: string
}
```

# `/prisons/`

## GET `/prisons/`

returned data on success:
```js
[
	{
		id: integer,
		username: string,
		address: string,
		name: string
	},
	.
	.
	.
]
```

## GET `/prisons/:id`

returned data on success:
```js
{
	id: integer,
	address: string,
	name: string,
	prisoners: [
		{
			id: integer,
			name: string,
			canHaveWorkLeave: boolean //0 - false, 1 - true
		},
		.
		.
		.
	]
}
```

## PUT `/prisons/:id`

expects in body: 
```js
{
	username: string,
	address: string,
	name: string,
	password: string
}
```

returned data on success:
```js
integer //0 no prison is updated, 1 successfully updated
```

## DELETE `/prisons/:id`
```js
string
```

# `/prisoners/`

## GET `/prisoners/`

returned data on success:
```js
[
	{
		id: integer,
		name: string,
		prison_id: integer,
		canHaveWorkLeave: boolean //0 - false, 1 - true
	},
	.
	.
	.
]
```

## GET `/prisoners/:id`

returned data on success:
```js
{
	id: integer,
	name: string,
	prison_id: integer,
	canHaveWorkLeave: boolean //0 - false, 1 - true
	skills: [
		{
			id: integer,
			name: string
		},
		.
		.
		.
	]
}
```

## POST `/prisoners/`

expected in body:
```js
{
	name: string,
	prison_id: integer
}
```

returned data on success:
```js
integer // prisoner id
```

## PUT `/prisoners/:id`

expected in body:
```js
{
	name: string,
	prison_id: integer,
	canHaveWorkLeave: boolean // true or false
}
```

returned data on success:
```js
integer: //0 fail, 1 success
```

## DELETE `/prisoners/:id`

```js
string //message
```

# `/skills/`

## GET `/skills/`

returned data on success:
```js
[
	{
		id: integer,
		name: string
	},
	.
	.
	.
]
```

## GET `/skills/:id`
```js
{
	id: integer,
	name: string
}
```

## POST `/skills/`

expected in body:
```js
{
	name: string,
	prisoner_id: integer
}
```

returned data on success:
```js
string //message
```

## DELETE `/skills/`

expected in body:
```js
{
	prisoner_id: integer,
	skill_id: integer
}
```

returned data on success:
```js
string // message
```
