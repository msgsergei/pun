import { useSubmit, PageProps, ActionContext } from "rakkasjs"

const API_URL = 'https://content-civicinfo.googleapis.com/civicinfo/v2/'
const API_KEY = 'AIzaSyCSvWsU49SRTe5oeWTdBCNVDYSl9drIsIw'

export async function action(ctx: ActionContext) {
	let formData = await ctx.requestContext.request.formData()
	let address = [formData.get('address'), formData.get('city'), formData.get('zip')].join(' ')
	console.log(address)
	let params = new URLSearchParams({
		address,
		roles: 'legislatorLowerBody',
		levels: 'country',
		key: API_KEY,
	})
	params.append('roles', 'legislatorUpperBody')

	let data = await fetch(API_URL + 'representatives?' + params)
	.then(x => x.json())

	if (data.error) return { data: { err: data.error }}

	console.log(data)
	let { divisions, offices, officials } = data
	offices.forEach(office => {
		office.officialIndices.forEach(idx => {
			let official = officials[idx]
			official.office = office.name
			official.division = divisions[office.divisionId].name
			delete official.address
		})
	})

	return { data: officials }
}

export default function Call({ actionData }: PageProps) {
	console.warn(actionData)
	let { submitHandler } = useSubmit()
	return (
		<form method="POST" onSubmit={submitHandler}>
			<input
				type="text"
				name="address"
				placeholder="address"
				autoComplete="street-address"
			/>
			<input
				type="text"
				name="city"
				placeholder="city"
				autoComplete="address-level2"
			/>
			<input
				type="text"
				name="zip"
				placeholder="ZIP"
				autoComplete="postal-code"
			/>
			<button type="submit">Search</button>
			{actionData?.err && <p style={{ color: "red" }}>{actionData.err.message}</p>}
			{actionData?.length && actionData.map(o =>
				<div key={o.name} style={{ paddingTop: 20 }}>
					<img src={o.photoUrl} />
					<div>{o.name}</div>
					<div>{o.office}</div>
					<div>{o.division}</div>
					<div>{o.party}</div>
					{o.phones?.map((p, i) => <a key={i} href={'tel:' + p} style={{ display: 'block' }}>{p}</a>)}
					{o.urls?.map((u, i) => <a key={i} href={u} style={{ display: 'block' }}>{u}</a>)}
					{o.channels?.map((c, i) => <div key={i}>{c.type}: {c.id}</div>)}
				</div>
			)}
		</form>
	)
}