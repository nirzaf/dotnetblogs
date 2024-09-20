interface SiteConfig {
	author: string
	title: string
	description: string
	lang: string
	ogLocale: string
	shareMessage: string
	paginationSize: number
}

export const siteConfig: SiteConfig = {
	author: 'Mohamed Fazrin', // Site author
	title: 'Dotnet Evangelist | Mohamed Fazrin', // Site title.
	description: 'Sharing my knowledge and experiences with the .NET community.', // Description to display in the meta tags
	lang: 'en-GB',
	ogLocale: 'en_GB',
	shareMessage: 'Share', // Message to share a post on social media
	paginationSize: 9 // Number of posts per page
}
