# marketing-api-test

**Set up instructions**

Pre-installation: 
1. Set up a postgres server

Installation

1. Clone the repository.
2. Run `npm install` command in the `package.json` root directory.
3. Create `development.env` file at the root directory, and put the information as shown in `development.env.example` base file. `development.env` file should contain database credentials, and Amplify API credentials.
4. Run `PORT=3000 npm run start` command at the root directory.
5. Wait for the Scheduler to load all data from the API. Since the API has limitations, fetching data will take some time with breaks.
6. After finishing loading, you are set up!


Endpoints:

`api/campaign/<campaign-id>/` - Get single campaign data

`api/campaign/download-csv` - Downloads CSV of all campaigns including section ids.

`api/campaign/analytics/minimal-spend` - Gets all campaigns with minimal spending based on `campaign.liveStatus.amountSpent`

