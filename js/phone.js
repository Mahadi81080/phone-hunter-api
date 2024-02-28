const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  //   console.log(phones);
  displayPhones(phones, isShowAll);
};
const displayPhones = (phones, isShowAll) => {
  // console.log(phones);
  const phoneContainer = document.getElementById("phone-container");
  //   clear phone container cards before adding new cards
  phoneContainer.textContent = "";
  //   show all button
  const showAllContainer = document.getElementById("show-all-container");
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }
  // display show only 12 phone if not show all
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }
  phones.forEach((phone) => {
    // console.log(phone);
    //2: creat a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-base-100 p-4 shadow-xl`;
    //3: creat a innerHtml
    phoneCard.innerHTML = `
    <figure class="px-10 pt-10">
    <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
    </figure>
    <div class="card-body items-center text-center">
    <h2 class="card-title">${phone.phone_name}</h2>
    <p>There are many variations of passages of available, but the majority have suffered</p>
    <div class="card-actions">
        <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
    </div>
      </div>
        `;
    //2: Append child
    phoneContainer.appendChild(phoneCard);
  });
  //   hide loading spinner
  toggleLoadingSpinner(false);
};

// Search Heandle
const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  //   console.log(searchText);
  loadPhone(searchText, isShowAll);
};
const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};
const handleShowDetails = async (id) => {
  //   console.log(id);
  //   load single phone data
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  showPhoneDetails(phone);
};

const showPhoneDetails = (phone) => {
  console.log(phone);
  // const phoneName = document.getElementById("show-detail-phone-name");
  // phoneName.innerText = phone.name;
  const showDetailContainer = document.getElementById('show-detail-container')
  showDetailContainer.innerHTML=`
  <img src="${phone.image}" alt="">
  <h1 class="font-bold text-3xl">${phone.name}</h1>
  <p><span class="text-lg font-semibold">Stroage:</span>${phone?.mainFeatures?.storage}</p>
  <p><span class="text-lg font-semibold">GPS:</span> ${phone?.others?.GPS}</p>
  `
  // show the modal
  show_details_modal.showModal();
};
// show all items
const handleShowAll = () => {
  handleSearch(true);
};
// loadPhone();
