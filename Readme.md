#Resource Management Admin portal.

This portal consists of a list of resources. The admin should be able to see all the resources, see tag-wise resources, see specific resource details, and add or update that resource.

### Refer to the image below:

<br/>
<div style="text-align: center;">
    <img src="https://www.loom.com/share/5957287ad8ce46e0b6b9f3de9ec7db51" alt="authentication-functionality-desktop-output" style="max-width:90%;box-shadow:0 2.8px 2.2px rgba(0, 0, 0, 0.12)">
</div>
<br/>

### Routes

<details>
<summary>Click to view</summary>

- [Login Route](https://res.cloudinary.com/dqwufvygi/image/upload/v1666529985/Assignment/login-page_pdherp.png)
- [Home Route](https://res.cloudinary.com/dqwufvygi/image/upload/v1666529974/Assignment/home-page_v77x6q.png)
- [Resource Route](https://res.cloudinary.com/dqwufvygi/image/upload/v1666529974/Assignment/resource-details-page_uzaz8p.png)
- [Add Item Route](https://res.cloudinary.com/dqwufvygi/image/upload/v1666529978/Assignment/add-item-page_w1c3mh.png)

</details>

### Complete Description

<details>
<summary>Functionality and Features</summary>
<br/>

The app have the following functionalities

- When the admin enters the valid credentials, page will be redirected to Home page.
- When the admin enters the invalid credentials, respective error message will be displayed.
- Using the Resources, Requests, Users tabs, resources corresponding to the tab will be displayed.
- On entering the text in Search Box, resources will be filtered and displayed, based on the name of the resource.
- Navigating through Pagination buttons at the bottom of Home Page, admin can view all the resources.
- On clicking the Resource user will be navigated to the detailed page of that particular Resource.
- Search functionality in Resource page works similarly as that of in Home page.
- using Sort Functionality admin can sort the items in ascending, descending, and recently added as well.
- Pagination in Resource Page works similarly as that of in Home page.
- DELETE Button will be active only if any of the items were checked.
- Admin can use the CheckBoxes against each item in the table and delete multiple items at a time.
- When ADD ITEM Button is active, on clicking it will navigate to Add, Item Page.
- When the admin enters the valid details, and click CREATE button, then item added successfully page will be displayed.
- On Clicking the ADD MORE button, more items can be added.
- When the admin enters the invalid details, corresponding error message will be displayed.
- When the admin clicks on LOGOUT button, page will be navigated to login route.

</details>

<details>

<summary>API Requests & Responses</summary>
<br/>

**loginRoute**

#### userDetails : {username : bhargav, password:bhargav@2021}

#### Description:

Returns a response based on the credentials provided

#### Success Response

- Redirected to home page on entering valid credentials

**HomeRoute**

#### GET RESOURCE LIST API - https://media-content.ccbp.in/website/react-assignment/resources.json

#### Success Response

Return a list of resources

**ResourceRoute**

#### GET RESOURCE DETAILS API: https://media-content.ccbp.in/website/react-assignment/resource/${resource_id}.json

#### Success Response

Return details of the resource with corresponding resource_id

#### UPDATE RESOURCE DETAILS API: https://media-content.ccbp.in/website/react-assignment/resource/update.json

#### Success Response

Update details of the resource with corresponding resource_id

#### Add RESOURCE ITEM API: https://media-content.ccbp.in/website/react-assignment/add_resource.json

#### Success Response

Adds the resource item with the given details into the list of resources

</details>
