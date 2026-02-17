/* ============================================================
   Fara Header Component - Complete JavaScript Logic
   استخراج شده از کد اصلی + قابلیت inject خودکار
   ============================================================ */

(function () {

  /* ─────────────────────────────────────────────
     HTML کامل هدر (برای inject)
  ───────────────────────────────────────────── */
  const HEADER_HTML = `
   <div class="headers-fixed">
    <!-- Header -->
    <div class="header">
      <div class="star">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M2 18.8571C2 18.3838 2.38376 18 2.85714 18H21.1429C21.6162 18 22 18.3838 22 18.8571C22 19.3305 21.6162 19.7143 21.1429 19.7143H2.85714C2.38376 19.7143 2 19.3305 2 18.8571Z" fill="#706DF2"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M2 4.85714C2 4.38376 2.38376 4 2.85714 4H21.1429C21.6162 4 22 4.38376 22 4.85714C22 5.33053 21.6162 5.71429 21.1429 5.71429H2.85714C2.38376 5.71429 2 5.33053 2 4.85714Z" fill="#706DF2"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M2 11.8571C2 11.3838 2.38376 11 2.85714 11H21.1429C21.6162 11 22 11.3838 22 11.8571C22 12.3305 21.6162 12.7143 21.1429 12.7143H2.85714C2.38376 12.7143 2 12.3305 2 11.8571Z" fill="#706DF2"/>
</svg>
      </div>
      <div class="logo">
        <svg xmlns="http://www.w3.org/2000/svg" width="58" height="21" viewBox="0 0 58 21" fill="none">
  <path d="M23.103 13.715C22.9898 14.3515 22.8603 15.2961 22.713 16.5516C22.6394 17.1772 22.5153 18.0445 22.4104 18.7584C22.3054 19.4723 21.6673 20.0261 20.927 20.0139L19.4559 19.9908C18.7046 19.9786 18.0611 19.4099 18.0066 18.6634C18.0025 18.6146 17.997 18.5861 17.9861 18.5847C17.9138 18.6173 17.8143 18.6878 17.6875 18.7951C16.5927 19.7288 15.5143 20.1944 14.4535 20.1944C12.8352 20.1944 11.6081 19.5578 10.7723 18.2861C9.97884 17.0972 9.72933 15.6762 10.0211 14.0244C10.3592 12.1161 11.15 10.5811 12.3934 9.41661C13.6859 8.21139 15.2688 7.60742 17.1435 7.60742C18.4456 7.60742 19.3945 8.06209 19.9889 8.97008C20.0149 9.01215 20.0408 9.03251 20.0653 9.03251C20.0939 9.03251 20.2344 8.78821 20.3952 8.48962C20.7361 7.85579 21.4655 7.53142 22.1663 7.70514L22.9284 7.8938C23.7888 8.10688 24.3041 8.98365 24.0669 9.83464C23.7233 11.0697 23.2775 12.7459 23.1071 13.715H23.103ZM19.0836 13.7896C19.2077 13.0879 19.0891 12.507 18.7264 12.0496C18.3638 11.5909 17.8252 11.3615 17.1122 11.3615C16.3991 11.3615 15.7815 11.5882 15.262 12.0428C14.7412 12.4975 14.4194 13.0798 14.2926 13.7896C14.174 14.4587 14.3049 15.0328 14.6839 15.5119C15.063 15.991 15.5852 16.2299 16.2491 16.2299C16.954 16.2299 17.5716 16.0005 18.1006 15.5418C18.6296 15.083 18.9568 14.4994 19.0836 13.7882V13.7896Z" fill="#706DF2"/>
  <path d="M56.0439 13.715C55.9307 14.3515 55.8012 15.2961 55.6539 16.5516C55.5803 17.1772 55.4563 18.0445 55.3513 18.7584C55.2463 19.4723 54.6082 20.0261 53.8679 20.0139L52.3968 19.9908C51.6455 19.9786 51.002 19.4099 50.9475 18.6634C50.9434 18.6146 50.9379 18.5861 50.927 18.5847C50.8548 18.6173 50.7552 18.6878 50.6284 18.7951C49.5336 19.7288 48.4552 20.1944 47.3944 20.1944C45.7761 20.1944 44.549 19.5578 43.7133 18.2861C42.9198 17.0972 42.6703 15.6762 42.962 14.0244C43.3001 12.1161 44.0909 10.5811 45.3343 9.41661C46.6268 8.21139 48.2098 7.60742 50.0844 7.60742C51.3865 7.60742 52.3354 8.06209 52.9299 8.97008C52.9558 9.01215 52.9817 9.03251 53.0062 9.03251C53.0348 9.03251 53.1753 8.78821 53.3362 8.48962C53.677 7.85579 54.4064 7.53142 55.1072 7.70514L55.8694 7.8938C56.7297 8.10688 57.245 8.98365 57.0078 9.83464C56.6642 11.0697 56.2184 12.7459 56.048 13.715H56.0439ZM52.0232 13.7896C52.1473 13.0879 52.0287 12.507 51.666 12.0496C51.3033 11.5909 50.7648 11.3615 50.0517 11.3615C49.3387 11.3615 48.721 11.5882 48.2016 12.0428C47.6808 12.4975 47.359 13.0798 47.2322 13.7896C47.1136 14.4587 47.2445 15.0328 47.6235 15.5119C48.0025 15.991 48.5247 16.2299 49.1887 16.2299C49.8936 16.2299 50.5112 16.0005 51.0402 15.5418C51.5692 15.083 51.8964 14.4994 52.0232 13.7882V13.7896Z" fill="#706DF2"/>
  <path d="M2.28773 20.1944C1.64147 20.1944 1.16701 20.1088 0.860242 19.9406C0.55484 19.7709 0.404865 19.5551 0.414409 19.2932C0.42259 19.0312 0.444404 18.7394 0.478489 18.4177L1.94824 10.0708C1.99868 9.78305 1.89779 9.63918 1.64284 9.63918H0.674819C0.249437 9.63918 0.0708314 9.4451 0.139002 9.05557L0.444404 7.50833C0.528935 7.17038 0.775711 7.00073 1.18337 7.00073H1.97823C2.0764 6.36554 2.12548 5.84979 2.17729 5.27569C2.30545 3.84381 2.72947 2.62095 3.83383 1.62202C4.93818 0.62446 6.37385 0.125 8.14218 0.125C9.55194 0.125 10.7204 0.434448 11.6461 1.05063C12.5719 1.66817 13.0354 2.43365 13.0354 3.34706C13.0354 4.07454 12.8146 4.71244 12.3728 5.26211C11.9311 5.81179 11.293 6.08731 10.4613 6.08731C9.79872 6.08731 9.2779 5.91901 8.85524 5.6435C7.36913 4.67172 8.10673 3.03761 8.75299 2.99283C8.15173 2.7621 6.63153 3.2317 6.43384 4.56586C6.22387 5.97602 7.44412 6.93558 8.9575 7.00208H10.0782C10.1805 7.00208 10.2732 7.03601 10.3591 7.10388C10.4436 7.17174 10.4695 7.28982 10.4354 7.45947L10.1546 9.18451C10.1205 9.33652 10.0659 9.45052 9.9896 9.52653C9.91324 9.60253 9.77281 9.64054 9.56967 9.64054H7.30096C7.08009 9.64054 6.94375 9.76676 6.8933 10.0206L5.55035 17.5301C5.49991 17.902 5.42628 18.2155 5.33357 18.4693C5.2395 18.7231 5.0827 18.9973 4.86183 19.2945C4.64096 19.5904 4.31783 19.8143 3.89382 19.9663C3.46843 20.1184 2.93398 20.1944 2.28773 20.1944Z" fill="#706DF2" stroke="#706DF2" stroke-width="0.25" stroke-miterlimit="10"/>
  <path d="M29.0009 6.646C29.1536 6.65414 29.2941 6.65821 29.4209 6.684C29.5477 6.70979 29.6663 6.75593 29.7781 6.8238C29.8885 6.89166 29.9853 6.95002 30.0712 7.00159C30.1557 7.05181 30.2375 7.13324 30.3139 7.24318C30.3902 7.35312 30.4502 7.43726 30.4925 7.49698C30.5348 7.5567 30.5852 7.64899 30.6452 7.77657C30.7052 7.90279 30.7434 7.99237 30.7597 8.04259C30.7761 8.09281 30.8061 8.18238 30.8483 8.30861C30.8906 8.43483 30.9124 8.50812 30.9124 8.52441C30.9629 8.67642 31.0392 8.75242 31.1415 8.75242C31.226 8.75242 31.3364 8.67642 31.4728 8.52441C32.6958 7.10339 33.8519 6.39355 34.9386 6.39355C35.4826 6.39355 35.9543 6.51163 36.3524 6.74915C36.7519 6.98666 37.0409 7.28254 37.2195 7.63678C37.3981 7.99237 37.4868 8.3819 37.4868 8.804C37.4868 9.71741 37.2318 10.4028 36.7219 10.8588C36.212 11.3149 35.5657 11.5442 34.7845 11.5442C34.3932 11.5442 34.036 11.4723 33.7142 11.3284C33.3911 11.1846 33.1443 11.0326 32.9753 10.8724C32.8048 10.7123 32.6139 10.5603 32.4013 10.4164C32.1886 10.2725 31.9895 10.2006 31.8027 10.2006C31.1565 10.2006 30.7325 10.8344 30.5279 12.1034L29.6104 17.5323C29.5422 17.9219 29.4618 18.2381 29.3677 18.4838C29.2736 18.7294 29.1209 18.9995 28.9096 19.2954C28.6969 19.5913 28.3738 19.8152 27.9416 19.9672C27.508 20.1192 26.9858 20.1952 26.3736 20.1952C25.711 20.1952 25.2229 20.1111 24.908 19.9414C24.593 19.7731 24.4403 19.5519 24.4499 19.2818C24.4581 19.0117 24.4799 18.7158 24.514 18.3942L25.6865 11.3162C25.6865 11.3162 25.9851 6.47906 28.9996 6.64736L29.0009 6.646Z" fill="#706DF2"/>
  <path d="M35.5195 6.646C35.6722 6.65414 35.8126 6.65821 35.9394 6.684C36.0662 6.70979 36.1848 6.75593 36.2966 6.8238C36.4071 6.89166 36.5039 6.95002 36.5898 7.00159C36.6743 7.05181 36.7561 7.13324 36.8324 7.24318C36.9088 7.35312 36.9688 7.43726 37.011 7.49698C37.0533 7.5567 37.1038 7.64899 37.1637 7.77657C37.2237 7.90279 37.2619 7.99237 37.2783 8.04259C37.2946 8.09281 37.3246 8.18238 37.3669 8.30861C37.4092 8.43483 37.431 8.50812 37.431 8.52441C37.4814 8.67642 37.5578 8.75242 37.66 8.75242C37.7446 8.75242 37.855 8.67642 37.9913 8.52441C39.2143 7.10339 40.3705 6.39355 41.4571 6.39355C42.0011 6.39355 42.4728 6.51163 42.871 6.74915C43.2704 6.98666 43.5595 7.28254 43.7381 7.63678C43.9167 7.99237 44.0053 8.3819 44.0053 8.804C44.0053 9.71741 43.7504 10.4028 43.2404 10.8588C42.7305 11.3149 42.0843 11.5442 41.303 11.5442C40.9117 11.5442 40.5545 11.4723 40.2328 11.3284C39.9096 11.1846 39.6629 11.0326 39.4938 10.8724C39.3234 10.7123 39.1325 10.5603 38.9198 10.4164C38.7071 10.2725 38.5081 10.2006 38.3213 10.2006C37.675 10.2006 37.251 10.8344 37.0465 12.1034L36.1289 17.5323C36.0608 17.9219 35.9803 18.2381 35.8862 18.4838C35.7922 18.7294 35.6395 18.9995 35.4281 19.2954C35.2154 19.5913 34.8923 19.8152 34.4601 19.9672C34.0266 20.1192 33.5044 20.1952 32.8922 20.1952C32.2296 20.1952 31.7415 20.1111 31.4265 19.9414C31.1116 19.7731 30.9589 19.5519 30.9684 19.2818C30.9766 19.0117 30.9984 18.7158 31.0325 18.3942L32.205 11.3162C32.205 11.3162 32.5036 6.47906 35.5181 6.64736L35.5195 6.646Z" fill="#706DF2"/>
</svg>
      </div>
      <div class="star">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M12 22C17.5232 22 22 17.5221 22 12C22 6.47676 17.5232 2 12 2C6.47676 2 2 6.47676 2 12C2 17.5221 6.47676 22 12 22Z" stroke="#706DF2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M16.4819 11.9997C16.4819 14.4754 14.4743 16.4819 11.9987 16.4819C9.52297 16.4819 7.51648 14.4754 7.51648 11.9997C7.51648 9.52406 9.52297 7.51758 11.9987 7.51758C14.4743 7.51758 16.4819 9.52406 16.4819 11.9997Z" stroke="#706DF2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path opacity="0.4" d="M5.10433 18.8964L8.55297 15.4477M18.8972 18.8964L15.4485 15.4477M8.55192 8.55108L5.10327 5.10352M15.4485 8.55108L18.8972 5.10352" stroke="#706DF2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
      </div>
    </div>

    <!-- Search Box -->
    <div class="search-box">
      

      <svg class="default-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M11.9886 19.9771C16.9528 19.9771 20.9771 15.9528 20.9771 10.9886C20.9771 6.02431 16.9528 2 11.9886 2C7.02431 2 3 6.02431 3 10.9886C3 15.9528 7.02431 19.9771 11.9886 19.9771Z" stroke="#A9A7F7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path opacity="0.4" d="M18.2402 17.707L21.7643 21.2219" stroke="#A9A7F7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

     
<svg class="focose" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M11.9886 19.9771C16.9528 19.9771 20.9771 15.9528 20.9771 10.9886C20.9771 6.02431 16.9528 2 11.9886 2C7.02431 2 3 6.02431 3 10.9886C3 15.9528 7.02431 19.9771 11.9886 19.9771Z" stroke="#706DF2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path opacity="0.4" d="M18.2402 17.707L21.7643 21.2219" stroke="#706DF2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

      <input type="text" placeholder="Search here">

    


 <a class="deleted" id="deleted-btn" href="#" style="padding-right: 0px; display: none;">

  <svg class="focose" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <g clip-path="url(#clip0_1614_19739)">
      <path d="M8 16L16 8M16 16L8 8" stroke="#FF595B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M1 12C1 3.7494 3.75 1 12 1C20.2501 1 23 3.7494 23 12C23 20.2494 20.2501 23 12 23C3.75 23 1 20.2494 1 12Z" stroke="#FF595B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    <defs>
      <clipPath id="clip0_1614_19739">
        <rect width="24" height="24" fill="white"/>
      </clipPath>
    </defs>
  </svg>
</a>





       <a href="" style="padding-left: 5px;" class="icon-btn">
        
    
    <svg class="default-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <g clip-path="url(#clip0_1614_17909)">
    <path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M1 12C1 3.7494 3.75 1 12 1C20.2501 1 23 3.7494 23 12C23 20.2494 20.2501 23 12 23C3.75 23 1 20.2494 1 12Z" stroke="#706DF2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M7 8H17" stroke="#706DF2" stroke-width="1.45" stroke-linecap="round"/>
    <path d="M10 7.00488L10 9.00488" stroke="#706DF2" stroke-width="2" stroke-linecap="round"/>
    <path d="M14 15L14 17" stroke="#706DF2" stroke-width="2" stroke-linecap="round"/>
    <path d="M7 16H17" stroke="#706DF2" stroke-width="1.45" stroke-linecap="round"/>
  </g>
  <defs>
    <clipPath id="clip0_1614_17909">
      <rect width="24" height="24" fill="white"/>
    </clipPath>
  </defs>
</svg>
    
    
    </a>

   
    
    
     <a href="" style="padding-left: 5px;">
      
    <svg class="focose" class="default-icon" id="open-filters" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <g clip-path="url(#clip0_1614_17909)">
    <path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M1 12C1 3.7494 3.75 1 12 1C20.2501 1 23 3.7494 23 12C23 20.2494 20.2501 23 12 23C3.75 23 1 20.2494 1 12Z" stroke="#706DF2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M7 8H17" stroke="#706DF2" stroke-width="1.45" stroke-linecap="round"/>
    <path d="M10 7.00488L10 9.00488" stroke="#706DF2" stroke-width="2" stroke-linecap="round"/>
    <path d="M14 15L14 17" stroke="#706DF2" stroke-width="2" stroke-linecap="round"/>
    <path d="M7 16H17" stroke="#706DF2" stroke-width="1.45" stroke-linecap="round"/>
  </g>
  <defs>
    <clipPath id="clip0_1614_17909">
      <rect width="24" height="24" fill="white"/>
    </clipPath>
  </defs>
</svg>
    
    
    </a>


        

    </div>
</div>

  <div class="home-container">

    <!-- ✅ آیکون فیلتر -->


    <!-- ✅ مودال فیلتر از پایین -->
    <div id="filter-modal" class="filter-modal hidden">
  <div class="filter-modal-content">
    <h3>Filters</h3>

    <div class="section">
  <h4>Type</h4>
  <div class="options">
  

    <button>
  <span class="icon left">
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none">
        <g opacity="0.4">
          <path d="M10.2042 21.6731V18.2421C10.2042 16.8031 9.03304 15.6406 7.59745 15.6406C6.15556 15.6406 4.99072 16.8094 4.99072 18.2421V21.6731" stroke="#706DF2" stroke-width="1.5" stroke-miterlimit="10"/>
          <path d="M7.59754 13.3562C8.61643 13.3562 9.4424 12.5319 9.4424 11.515C9.4424 10.4982 8.61643 9.67383 7.59754 9.67383C6.57866 9.67383 5.75269 10.4982 5.75269 11.515C5.75269 12.5319 6.57866 13.3562 7.59754 13.3562Z" stroke="#706DF2" stroke-width="1.5" stroke-miterlimit="10"/>
        </g>
        <path d="M13.4847 13.8435H19.4726C20.8641 13.8435 21.9912 14.9683 21.9912 16.3571V20.429C21.9912 21.2962 21.286 22 20.4171 22H3.57411C2.7052 22 2 21.2962 2 20.429V5.14194C2 3.40759 3.4104 2 5.14822 2H10.0406C11.7784 2 13.1888 3.40759 13.1888 5.14194V13.5482C13.1888 13.7116 13.321 13.8435 13.4847 13.8435Z" stroke="#706DF2" stroke-width="1.5" stroke-miterlimit="10"/>
        <path d="M15.2036 8.92285H13.1887" stroke="#706DF2" stroke-width="1.5" stroke-miterlimit="10"/>
        <path d="M17.8797 11.4373C19.2706 11.4373 20.3982 10.3119 20.3982 8.92371C20.3982 7.53551 19.2706 6.41016 17.8797 6.41016C16.4887 6.41016 15.3611 7.53551 15.3611 8.92371C15.3611 10.3119 16.4887 11.4373 17.8797 11.4373Z" stroke="#706DF2" stroke-width="1.5" stroke-miterlimit="10"/>
        <path d="M13.1887 13V21.3402" stroke="#706DF2" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
      </svg>
  </span>

  <span class="label">Hotel</span>

  <span class="icon right">
   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <g clip-path="url(#clip0_1724_19702)">
    <path d="M8 16L16 8M16 16L8 8" stroke="#E2E2FC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M1 12C1 3.7494 3.75 1 12 1C20.2501 1 23 3.7494 23 12C23 20.2494 20.2501 23 12 23C3.75 23 1 20.2494 1 12Z" stroke="#E2E2FC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <defs>
    <clipPath id="clip0_1724_19702">
      <rect width="24" height="24" fill="white"/>
    </clipPath>
  </defs>
</svg>
  </span>
</button>
    
    <button>
  <span class="icon left">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <g opacity="0.4">
    <path d="M14.5671 21.6364V17.7448C14.5671 16.1125 13.2454 14.7939 11.6251 14.7939C9.99777 14.7939 8.68311 16.1197 8.68311 17.7448V21.6364" stroke="#706DF2" stroke-width="1.5" stroke-miterlimit="10"/>
    <path d="M15 7H8" stroke="#706DF2" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
    <path d="M15 11H8" stroke="#706DF2" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
  </g>
  <path d="M7.55315 2H15.6899C17.6512 2 19.243 3.59658 19.243 5.56379V19.8617C19.243 21.0449 18.2908 22 17.1111 22H6.13189C4.95225 22 4 21.0449 4 19.8617V5.56379C4 3.59658 5.59181 2 7.55315 2Z" stroke="#706DF2" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
</svg>
  </span>

  <span class="label">Apartment</span>

  <span class="icon right">
   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <g clip-path="url(#clip0_1724_19702)">
    <path d="M8 16L16 8M16 16L8 8" stroke="#E2E2FC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M1 12C1 3.7494 3.75 1 12 1C20.2501 1 23 3.7494 23 12C23 20.2494 20.2501 23 12 23C3.75 23 1 20.2494 1 12Z" stroke="#E2E2FC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <defs>
    <clipPath id="clip0_1724_19702">
      <rect width="24" height="24" fill="white"/>
    </clipPath>
  </defs>
</svg>
  </span>
</button>
    
    <button>
  <span class="icon left">
   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M20.5262 7.5L20.5262 15.2959C20.5262 17.4498 18.8058 19.1981 16.6863 19.1981H7.06997C4.95046 19.1981 3.22999 17.4498 3.22999 15.2959L3.22998 7.5" stroke="#706DF2" stroke-width="1.5" stroke-miterlimit="10"/>
  <path d="M3.22998 15.0898V21.9636" stroke="#706DF2" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
  <path d="M9.16309 19.1982V21.9637" stroke="#706DF2" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
  <path d="M14.5862 19.1982V21.9637" stroke="#706DF2" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
  <path d="M20.5261 15.2891V21.9634" stroke="#706DF2" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
  <path d="M1 10C1 10 8.194 2 12.0733 2C15.7107 2 23 10 23 10" stroke="#706DF2" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
  <g opacity="0.4">
    <path d="M11.8127 10.0313C12.8713 10.0313 13.7294 9.15925 13.7294 8.08352C13.7294 7.00779 12.8713 6.13574 11.8127 6.13574C10.7541 6.13574 9.896 7.00779 9.896 8.08352C9.896 9.15925 10.7541 10.0313 11.8127 10.0313Z" stroke="#706DF2" stroke-width="1.5" stroke-miterlimit="10"/>
    <path d="M14.5383 15.0509C14.5383 13.5432 13.3137 12.3252 11.8126 12.3252C10.3049 12.3252 9.08691 13.5498 9.08691 15.0509" stroke="#706DF2" stroke-width="1.5" stroke-miterlimit="10"/>
    <path d="M9.08691 15.0508V18.8668" stroke="#706DF2" stroke-width="1.5"/>
    <path d="M14.5383 15.0508V18.8668" stroke="#706DF2" stroke-width="1.5"/>
  </g>
</svg>
  </span>

  <span class="label">Villa</span>

  <span class="icon right">
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <g clip-path="url(#clip0_1724_19702)">
    <path d="M8 16L16 8M16 16L8 8" stroke="#E2E2FC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M1 12C1 3.7494 3.75 1 12 1C20.2501 1 23 3.7494 23 12C23 20.2494 20.2501 23 12 23C3.75 23 1 20.2494 1 12Z" stroke="#E2E2FC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <defs>
    <clipPath id="clip0_1724_19702">
      <rect width="24" height="24" fill="white"/>
    </clipPath>
  </defs>
</svg>
  </span>
</button>
    
    <button>
  <span class="icon left">
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M17.3151 13.8887H20.5671C21.3552 13.8887 22 14.4181 22 15.0651V20.7122C22 21.3593 21.3552 21.8887 20.5671 21.8887H3.43293C2.64482 21.8887 2 21.3593 2 20.7122V15.0651C2 14.4181 2.64482 13.8887 3.43293 13.8887H6.91203" stroke="#706DF2" stroke-width="1.5" stroke-miterlimit="10"/>
  <path d="M6.44434 8V21.8889M17.5554 8V21.8889" stroke="#706DF2" stroke-width="1.5" stroke-miterlimit="10"/>
  <g opacity="0.4">
    <path d="M14.7777 21.3337V17.7112C14.7777 16.0328 13.5297 14.667 11.9999 14.667C10.4634 14.667 9.22217 16.0328 9.22217 17.7112V21.3337" stroke="#706DF2" stroke-width="1.5" stroke-miterlimit="10"/>
    <path d="M11.7221 12.4446C12.805 12.4446 13.6828 11.574 13.6828 10.5001C13.6828 9.42622 12.805 8.55566 11.7221 8.55566C10.6393 8.55566 9.76147 9.42622 9.76147 10.5001C9.76147 11.574 10.6393 12.4446 11.7221 12.4446Z" stroke="#706DF2" stroke-width="1.5" stroke-miterlimit="10"/>
  </g>
  <path d="M4 11C4 11 9.232 3 12.0533 3C14.6987 3 20 11 20 11" stroke="#706DF2" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
</svg>
  </span>

  <span class="label">Farmland</span>

  <span class="icon right">
   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <g clip-path="url(#clip0_1724_19702)">
    <path d="M8 16L16 8M16 16L8 8" stroke="#E2E2FC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M1 12C1 3.7494 3.75 1 12 1C20.2501 1 23 3.7494 23 12C23 20.2494 20.2501 23 12 23C3.75 23 1 20.2494 1 12Z" stroke="#E2E2FC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <defs>
    <clipPath id="clip0_1724_19702">
      <rect width="24" height="24" fill="white"/>
    </clipPath>
  </defs>
</svg>
  </span>
</button>
    
     <button>
  <span class="icon left">
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M2.58472 6.17195C2.58472 6.17195 6.36737 2 8.43272 2C10.3668 2 14.2807 6.17195 14.2807 6.17195" stroke="#706DF2" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
  <path d="M12.7216 4.56898L13.4036 13.19L18.3532 14.5191C19.4673 14.7396 20.276 15.7181 20.276 16.8605V20.5865C20.276 21.367 19.6426 22.0004 18.8622 22.0004H4.86502C4.08458 22.0004 3.45117 21.367 3.45117 20.5865L4.33922 4.41797" stroke="#706DF2" stroke-width="1.5" stroke-miterlimit="10"/>
  <path d="M13.4036 13.1895L14 21.4999" stroke="#706DF2" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
  <g opacity="0.4">
    <path d="M11.2975 21.5682V18.1691C11.2975 16.7435 10.1373 15.5918 8.71504 15.5918C7.28657 15.5918 6.13257 16.7497 6.13257 18.1691V21.5682" stroke="#706DF2" stroke-width="1.5" stroke-miterlimit="10"/>
    <path d="M8.50616 13.3288C9.51557 13.3288 10.3339 12.5121 10.3339 11.5047C10.3339 10.4973 9.51557 9.68066 8.50616 9.68066C7.49675 9.68066 6.67847 10.4973 6.67847 11.5047C6.67847 12.5121 7.49675 13.3288 8.50616 13.3288Z" stroke="#706DF2" stroke-width="1.5" stroke-miterlimit="10"/>
  </g>
</svg>
  </span>

  <span class="label">Farmland</span>

  <span class="icon right">
   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <g clip-path="url(#clip0_1724_19702)">
    <path d="M8 16L16 8M16 16L8 8" stroke="#E2E2FC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M1 12C1 3.7494 3.75 1 12 1C20.2501 1 23 3.7494 23 12C23 20.2494 20.2501 23 12 23C3.75 23 1 20.2494 1 12Z" stroke="#E2E2FC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <defs>
    <clipPath id="clip0_1724_19702">
      <rect width="24" height="24" fill="white"/>
    </clipPath>
  </defs>
</svg>
  </span>
</button>
  <button>
  <span class="icon left">
 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M20.719 17.627C20.719 19.8101 18.949 21.587 16.7589 21.587H6.85532C4.67212 21.587 2.89526 19.817 2.89526 17.627" stroke="#706DF2" stroke-width="1.5" stroke-miterlimit="10"/>
  <path d="M1.4834 21.5868C1.4834 21.5868 8.2396 2 11.8829 2C15.2988 2 22.1446 21.5868 22.1446 21.5868" stroke="#706DF2" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
  <g opacity="0.4">
    <path d="M11.745 12.5026C12.8594 12.5026 13.7629 11.5992 13.7629 10.4847C13.7629 9.37024 12.8594 8.4668 11.745 8.4668C10.6305 8.4668 9.72705 9.37024 9.72705 10.4847C9.72705 11.5992 10.6305 12.5026 11.745 12.5026Z" stroke="#706DF2" stroke-width="1.5" stroke-miterlimit="10"/>
    <path d="M14.6651 21.9999V17.8883C14.6651 16.3112 13.3841 15.0371 11.8139 15.0371C10.2368 15.0371 8.96265 16.3181 8.96265 17.8883V21.9999" stroke="#706DF2" stroke-width="1.5" stroke-miterlimit="10"/>
  </g>
</svg>
  </span>

  <span class="label">Resort</span>

  <span class="icon right">
   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <g clip-path="url(#clip0_1724_19702)">
    <path d="M8 16L16 8M16 16L8 8" stroke="#E2E2FC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M1 12C1 3.7494 3.75 1 12 1C20.2501 1 23 3.7494 23 12C23 20.2494 20.2501 23 12 23C3.75 23 1 20.2494 1 12Z" stroke="#E2E2FC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <defs>
    <clipPath id="clip0_1724_19702">
      <rect width="24" height="24" fill="white"/>
    </clipPath>
  </defs>
</svg>
  </span>
</button>
  </div>
</div>


    <div class="section">
      <h4>City</h4>
      <div class="input-icon-wrapper double-icons">
         <div class="input-group city-group">
          <div class="city-input" id="cityInput">
            <div class="city-top">
              <span class="city-icon-left">
               
                <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">

                  
  <path   d="M15.1226 10.5674C15.1226 9.03266 13.8789 7.78906 12.3441 7.78906C10.8106 7.78906 9.56696 9.03266 9.56696 10.5674C9.56696 12.101 10.8106 13.3447 12.3441 13.3447C13.8789 13.3447 15.1226 12.101 15.1226 10.5674Z" stroke="#A9A7F7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path   d="M12.3328 22C9.11276 22 4 16.3986 4 10.4429C4 5.78051 7.73011 2 12.3328 2C16.9354 2 20.6667 5.78051 20.6667 10.4429C20.6667 16.3986 15.5539 22 12.3328 22Z" stroke="#A9A7F7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
              </span>
                <span class="city-label">From</span>
                  <span class="selected-city"></span>

               <span class="city-icon-right">
       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M2 11.5726C2 4.39264 4.5 2 12 2C19.5 2 22 4.39264 22 11.5726C22 18.7516 19.5 21.1453 12 21.1453C4.5 21.1453 2 18.7516 2 11.5726Z" stroke="#706DF2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8.5 9H15.7292M8.5 14.2089H15.7292" stroke="#706DF2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

      </span>
            </div>

            <div class="city-options">
              <div class="city-option" data-city="Baghdad">Baghdad</div>
              <div class="city-option" data-city="Basrah">Basrah</div>
              <div class="city-option" data-city="Mosul">Mosul</div>
              <div class="city-option" data-city="Diyali">Diyali</div>
              <div class="city-option" data-city="Karbala">Karbala</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h4>Date</h4>
      <div class="date">
        <div class="input-icon-wrapper">
          <input type="text" placeholder="From">
          <svg class="icon-single" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M3 12.7252C3 5.76917 5.319 3.45117 12.274 3.45117C19.23 3.45117 21.549 5.76917 21.549 12.7252C21.549 19.6812 19.23 21.9992 12.274 21.9992C5.319 21.9992 3 19.6812 3 12.7252Z" stroke="#A9A7F7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path opacity="0.4" d="M3.27539 9.27441H21.2833" stroke="#A9A7F7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path opacity="0.4" d="M16.6787 13.2109H16.6877" stroke="#A9A7F7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path opacity="0.4" d="M12.2793 13.2109H12.2883" stroke="#A9A7F7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path opacity="0.4" d="M7.87158 13.2109H7.88058" stroke="#A9A7F7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path opacity="0.4" d="M16.6787 17.0625H16.6877" stroke="#A9A7F7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path opacity="0.4" d="M12.2793 17.0625H12.2883" stroke="#A9A7F7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path opacity="0.4" d="M7.87158 17.0625H7.88058" stroke="#A9A7F7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M16.2832 2V5.262" stroke="#A9A7F7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8.2749 2V5.262" stroke="#A9A7F7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
        </div>
        <div class="input-icon-wrapper">
          <input type="text" placeholder="To">
          <svg class="icon-single" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M3 12.7252C3 5.76917 5.319 3.45117 12.274 3.45117C19.23 3.45117 21.549 5.76917 21.549 12.7252C21.549 19.6812 19.23 21.9992 12.274 21.9992C5.319 21.9992 3 19.6812 3 12.7252Z" stroke="#A9A7F7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path opacity="0.4" d="M3.27539 9.27441H21.2833" stroke="#A9A7F7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path opacity="0.4" d="M16.6787 13.2109H16.6877" stroke="#A9A7F7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path opacity="0.4" d="M12.2793 13.2109H12.2883" stroke="#A9A7F7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path opacity="0.4" d="M7.87158 13.2109H7.88058" stroke="#A9A7F7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path opacity="0.4" d="M16.6787 17.0625H16.6877" stroke="#A9A7F7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path opacity="0.4" d="M12.2793 17.0625H12.2883" stroke="#A9A7F7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path opacity="0.4" d="M7.87158 17.0625H7.88058" stroke="#A9A7F7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M16.2832 2V5.262" stroke="#A9A7F7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8.2749 2V5.262" stroke="#A9A7F7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
        </div>
      </div>
    </div>

    <div class="section">
      <h4>Bed & Room</h4>
      <div class="date">
        <div class="input-icon-wrapper">
          <input type="text" placeholder="Rooms">
          <svg class="icon-single" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M7.71268 6.1582C10.3163 6.1582 12.4254 8.26838 12.4254 10.8709C12.4254 12.7944 11.2719 14.4457 9.62067 15.178V20.0918C9.62067 21.1464 8.76612 21.9998 7.71268 21.9998C6.65924 21.9998 5.80362 21.1464 5.80362 20.0918L5.80474 15.178C4.15457 14.4457 3 12.7944 3 10.8709C3 8.26838 5.1102 6.1582 7.71268 6.1582Z" stroke="#A9A7F7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M11.2407 7.73836C11.4496 7.45833 11.7108 7.19828 12.0097 6.96937C12.4608 6.62823 12.9609 6.39823 13.4809 6.26821C13.791 6.19821 14.111 6.1582 14.431 6.1582C15.6612 6.1582 16.8713 6.71827 17.6614 7.76949L21.1017 12.3388C22.4318 14.1201 22.0818 16.6504 20.3016 17.9905C18.5215 19.3206 15.9912 18.9706 14.65 17.1904L11.7408 13.31" stroke="#A9A7F7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path opacity="0.4" d="M13.4801 6.27154V4.97142C13.4801 3.33126 12.1498 2 10.4997 2C8.85844 2 7.53833 3.33126 7.53833 4.97142V10.572" stroke="#A9A7F7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
        </div>
        <div class="input-icon-wrapper">
          <input type="text" placeholder="Beds">
          <svg class="icon-single" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M2 14.602C2 13.8737 2 13.5094 2.1051 13.2175C2.28458 12.719 2.67705 12.3265 3.17558 12.1471C3.4675 12.042 3.83166 12.042 4.56 12.042H19.44C20.1683 12.042 20.5324 12.042 20.8243 12.1471C21.3229 12.3265 21.7153 12.719 21.8949 13.2175C22 13.5094 22 13.8737 22 14.602V16.1487C22 16.877 22 17.2411 21.8949 17.5331C21.7153 18.0315 21.3229 18.4241 20.8243 18.6035C20.5324 18.7086 20.1683 18.7086 19.44 18.7086H4.56C3.83166 18.7086 3.4675 18.7086 3.17558 18.6035C2.67705 18.4241 2.28458 18.0315 2.1051 17.5331C2 17.2411 2 16.877 2 16.1487V14.602Z" stroke="#A9A7F7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path opacity="0.4" d="M19.5402 20.4444V18.709M4.46094 18.709V20.4444" stroke="#A9A7F7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M19.5402 12.0423V6.56C19.5402 5.83166 19.5402 5.4675 19.4351 5.17558C19.2557 4.67705 18.8632 4.28458 18.3647 4.1051C18.0728 4 17.7086 4 16.9802 4H7.02093C6.2926 4 5.92844 4 5.63651 4.1051C5.13799 4.28458 4.74552 4.67705 4.56604 5.17558C4.46094 5.4675 4.46094 5.83166 4.46094 6.56V12.0423" stroke="#A9A7F7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path opacity="0.4" d="M15.8889 12.0073V11.0043C15.8889 10.276 15.8889 9.91183 15.7838 9.61991C15.6042 9.12139 15.2118 8.72891 14.7132 8.54944C14.4213 8.44434 14.0572 8.44434 13.3289 8.44434H10.6711C9.94278 8.44434 9.57856 8.44434 9.28667 8.54944C8.78814 8.72891 8.39566 9.12139 8.21618 9.61991C8.11108 9.91183 8.11108 10.276 8.11108 11.0043V12.0073" stroke="#A9A7F7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
        </div>
      </div>
    </div>

    <button class="apply">Apply Filters</button>
  </div>
</div>

    <div class="search-overlay">
      <div class="search-popup">
        <div class="popup-header d-flex justify-content-between align-items-center mb-2">
          <h4 class="popup-title">Recent Searches</h4>
<button class="clear-btn">Clear All</button>

        </div>

        <div class="no-results">
          <div class="no-results-box">
            <h3>No Results!</h3>
            <p>Sorry, Check your search and try again!</p>
          </div>
        </div>

        <!-- ========== Phase 4 Results Layout ========== -->
        <div id="results-box" class="results" style="display: none; background-color: transparent;">


          <!-- 🔹 دسته اول -->
          <div class="category">
            <h3 style="font-size: 20px; font-weight: 700; color: #45454D;">Results</h3>
            <div class="category-header">
              <span>Hotels</span>
              <span class="count">999</span>
            </div>

            <div class="hotel-item" data-img="./img/hotel1.jpg" data-location="Bucharest • Romania"
              data-price="50 USD / Night" onclick="openHotelDetails(this)">
              <img src="./img/20.jpg" alt="Hotel Transylvania"
                class="thumb" />
              <div class="info" style="padding: 10px;">
                <h3>Hotel Transylvania</h3>
                <p>Bucharest • Romania</p>
                <p class="price">50 USD / Night</p>
              </div>
            </div>

            <div class="hotel-item" data-img="./img/hotel2.jpg" data-location="California • USA"
              data-price="50 USD / Night" onclick="openHotelDetails(this)">
              <img src="./img/20.jpg" alt="Hotel del Coronado"
                class="thumb" />
              <div class="info" style="padding: 10px;">
                <h3>Hotel del Coronado</h3>
                <p>California • USA</p>
                <p class="price">50 USD / Night</p>
              </div>
            </div>

            <div class="hotel-item" style="border-bottom: none;" id="hor" data-img="./img/hotel3.jpg" data-location="California • USA"
              data-price="50 USD / Night" onclick="openHotelDetails(this)">
              <img src="./img/20.jpg" alt="Hotel California"
                class="thumb" />
              <div class="info" style="padding: 10px;">
                <h3>Hotel California</h3>
                <p>California • USA</p>
                <p class="price">50 USD / Night</p>
              </div>
            </div>
          </div>

          <!-- 🔹 دسته دوم -->
          <div class="category">
            <div class="category-header">
              <span class="pt-3">Farm Houses</span>
              <span class="count mt-3">999</span>
            </div>

            <div class="hotel-item" data-img="./img/farm1.jpg" data-location="City • Country" data-price="Price"
              onclick="openHotelDetails(this)">
              <img src="./img/20.jpg" alt="Reserve Now" class="thumb" />
              <div class="info" style="padding: 10px;">
                <h3>Reserve Now!</h3>
                <p>City • Country</p>
                <p class="price">Price</p>
              </div>
            </div>

            <div class="hotel-item" style="border-bottom: none;" data-img="./img/farm2.jpg" data-location="City • Country" data-price="Price"
              onclick="openHotelDetails(this)">
              <img src="./img/20.jpg" alt="Reserve Now" class="thumb" />
              <div class="info" style="padding: 10px;">
                <h3>Reserve Now!</h3>
                <p>City • Country</p>
                <p class="price">Price</p>
              </div>
            </div>
          </div>

        </div>

        <!-- 🔹 Modal جزئیات -->
        <div id="phase4-modal" class="modal hidden">
          <div class="modal-content">
            <button class="close-btn" onclick="closeModal()">×</button>
            <h2 id="hotel-name"></h2>
            <img id="hotel-img" src="" alt="Hotel Image" />
            <p id="hotel-location"></p>
            <p id="hotel-price"></p>
          </div>
        </div>


        <ul class="search-list">
          <li><img src="./img/17.png" alt=""> Hotels in Baghdad</li>
          <li><img src="./img/18.png" alt=""> Hotels in Najaf</li>
          <li><img src="./img/18.png" alt=""> 5 Star Hotels</li>
          <li><img src="./img/18.png" alt=""> Discounts</li>
          <li><img src="./img/18.png" alt=""> The Best Hotels Of The Month</li>
        </ul>
      </div>
    </div>
    </div>


    <div class="home">

     <!-- 🔍 صفحه نتایج فیلتر -->
    <div id="filter" class="hidden">
      <br>
      <br>
      <div class="filter-results">
        <h2 class="results-heading">
          <!-- 55 Search Results -->
           No Search Results
          <a href="#" id="toggle-slider">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M12.965 2.05869L17.9111 2.79923C20.5554 3.19491 21.9208 5.30737 21.5251 7.94848L20.4592 15.075C20.0635 17.7162 18.1403 19.3368 15.4948 18.9411L10.5499 18.2005C7.90555 17.8048 6.54012 15.6934 6.93472 13.0512L8.00176 5.92468C8.39636 3.28357 10.3283 1.66517 12.965 2.05869Z" stroke="#706DF2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path opacity="0.4" d="M8.16806 5.19434L4.98964 6.24408C2.44691 7.08085 1.44798 9.39222 2.29555 11.935L4.54531 18.7762C5.38316 21.3091 7.55292 22.5804 10.0849 21.7438L14.8482 20.1794C15.6449 19.9275 16.3108 19.5037 16.7952 18.9685" stroke="#706DF2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
          </a>
        </h2>

        <!-- دسته‌های فیلتر همان بالا -->
        <div class="filter-chips">
           <button><img src="./img/17.png" width="22px" height="22px" alt="">Hotels</button>
        <button><img src="./img/17.png" width="22px" height="22px" alt="">Apartment</button>
        <button><img src="./img/17.png" width="22px" height="22px" alt="">Villa</button>
        <button><img src="./img/17.png" width="22px" height="22px" alt="">Farms</button>
        <button><img src="./img/17.png" width="22px" height="22px" alt="">Resort</button>




        </div>

        <!-- گروه Hotels -->
        <!-- <div class="section-group">
          <div class="group-title">
            <h3>Hotels</h3>
            <span>4</span>
          </div>

          <div class="hotel-card">
            <img src="./img/29.png" alt="Hotel Transylvania">
            <div class="info" style="padding: 0px;">
              <h4>Hotel Transylvania</h4>
              <p>Bucharest • Romania</p>
              <strong>50 USD / Night</strong>
            </div>
          </div>

        

          <div class="hotel-card">
            <img src="./img/29.png" alt="">
            <div class="info" style="padding: 0px;">
              <h4>Hotel Transylvania</h4>
              <p>Bucharest • Romania</p>
              <strong>50 USD / Night</strong>
            </div>
          </div>

        

          <div class="hotel-card">
            <img src="./img/29.png" alt="">
            <div class="info" style="padding: 0px;">
              <h4>Hotel Transylvania</h4>
              <p>Bucharest • Romania</p>
              <strong>50 USD / Night</strong>
            </div>
          </div>

        

          <div class="hotel-card">
            <img src="./img/29.png" alt="">
            <div class="info" style="padding: 0px;">
              <h4>Hotel Transylvania</h4>
              <p>Bucharest • Romania</p>
              <strong>50 USD / Night</strong>
            </div>
          </div>
        </div>

       
        <div class="section-group">
          <div class="group-title">
            <h3>Farms</h3>
            <span>2</span>
          </div>

          <div class="hotel-card">
            <img src="./img/29.png" alt="">
            <div class="info" style="padding: 0px;">
              <h4>Hotel Transylvania</h4>
              <p>Bucharest • Romania</p>
              <strong>50 USD / Night</strong>
            </div>
          </div>

        

          <div class="hotel-card">
            <img src="./img/29.png" alt="">
            <div class="info" style="padding: 0px;">
              <h4>Hotel Transylvania</h4>
              <p>Bucharest • Romania</p>
              <strong>50 USD / Night</strong>
            </div>
          </div> -->

          <!-- <div class="fara-item-box">
                <div class="fara-img-holder position-relative">
                    <img src="./img/20.jpg" class="img-fluid rounded-top" alt="">
                    <div class="fara-star-mark position-absolute">✧ 3.5</div>
                    <div class="fara-price-bar d-flex justify-content-between align-items-center ">
                        <span class="fara-price-main">Price <span class="fara-price-sub">/Night</span></span>
                        <div class="fara-price-icon">⤿</div>
                    </div>
                </div>
                <div class="fara-info-panel px-3 pb-2">
                    <h4>Hotel Transylvania</h4>
                    <p>Bucharest • Romania</p>
                </div>
            </div> -->
            <div class="empty-box">
  <img src="./img/box.png" alt="No Rooms Found">
  <h3>No Rooms Found!</h3>
  <p>
    Sorry, but I could not find any places.please check your search or reset the filters you may applied.
  </p>
</div>

        </div>
      </div>
      </div>
  `;

  /* ─────────────────────────────────────────────
     Inject HTML
  ───────────────────────────────────────────── */
  function injectHeader() {
    const wrapper = document.createElement('div');
    wrapper.id = 'fara-header-root';
    wrapper.innerHTML = HEADER_HTML;
    document.body.insertBefore(wrapper, document.body.firstChild);
  }

  /* ─────────────────────────────────────────────
     منطق کامل (استخراج شده از کد اصلی)
  ───────────────────────────────────────────── */
  function initHeader() {

    // عناصر اصلی
    const searchBox = document.querySelector('.search-box');
    const searchInput = searchBox.querySelector('input');
    const searchOverlay = document.querySelector('.search-overlay');
    const searchList = document.querySelector('.search-list');
    const listItems = searchList.querySelectorAll('li');
    const noResults = document.querySelector('.no-results');
    const resultsBox = document.getElementById('results-box');
    const popupTitle = document.querySelector('.popup-title');
    const clearBtn = document.querySelector('.clear-btn');
    const deletedBtn = document.getElementById('deleted-btn');
    const filterModal = document.getElementById('filter-modal');
    const filterBtn = document.getElementById('open-filters');
const bottomNav = document.querySelector('.bottom-nav');
const home = document.getElementById('home');         // صفحه اصلی
const filterPage = document.getElementById('filter'); // صفحه فیلتر
/* ===== 🟢 کلیک Apply Filters ===== */
    const applyBtn = document.querySelector('.apply');
    if (applyBtn) {
        applyBtn.addEventListener('click', () => {
            filterModal.classList.add('hidden');
            home.classList.add('fade-out');
            setTimeout(() => {
                home.classList.add('hidden');
                filterPage.classList.remove('hidden');
                filterPage.classList.add('fade-in');
                bottomNav.classList.remove('hide-bottom-nav');
                triggers.forEach(t => t.classList.add('active-filter'));
            }, 300);
            filterOpen = false;
            filterPageActive = true;
        });
    }

    // آیکن‌های جستجو
    const defaultIcons = document.querySelectorAll('.default-icon');
    const focusIcons = document.querySelectorAll('.focose');
listItems.forEach(item => {
  item.addEventListener('mousedown', function (e) {
    e.preventDefault(); // ✅ جلوی blur شدن input رو می‌گیره

    // مقدار سرچ = متن آیتم
    searchInput.value = this.textContent.trim();

    // ✅ فوکوس حتماً باقی بمونه
    searchInput.focus();

    // عنوان
    popupTitle.textContent = 'Search Results';

    // نمایش نتایج
    searchList.style.display = 'none';
    noResults.style.display = 'none';
    resultsBox.style.display = 'block';

    // ✅ ضربدر حتماً نمایش داده بشه
    deletedBtn.style.display = 'inline-flex';
    
  });
});

let isUserScrolling = false;

window.addEventListener('scroll', () => {
    if (!searchOverlay.classList.contains('active')) return;

    // جلوگیری از اجرای چندباره هنگام اسکرول سریع
    if (isUserScrolling) return;
    isUserScrolling = true;

    requestAnimationFrame(() => {
    searchOverlay.classList.remove('active');
    searchOverlay.classList.remove('scrollable');

    if (bottomNav) {
      bottomNav.classList.remove('hide-bottom-nav');
    }

    isUserScrolling = false;
});

});

    /* ────────────────────────────────────────
       🔵 مدیریت آیکن‌های search
    ──────────────────────────────────────── */
    function showDefaultIcons() {
      defaultIcons.forEach(icon => icon.style.display = 'inline');
      focusIcons.forEach(icon => icon.style.display = 'none');
    }

    function showFocusIcons() {
      defaultIcons.forEach(icon => icon.style.display = 'none');
      focusIcons.forEach(icon => icon.style.display = 'inline');
    }

    showDefaultIcons();

    /* ────────────────────────────────────────
       ❌ دکمه حذف (deleted-btn)
       دقیقاً از کد اصلی
    ──────────────────────────────────────── */
    searchInput.addEventListener('input', function () {
      if (this.value.trim() !== '') {
        deletedBtn.style.display = 'inline-block';
      } else {
        deletedBtn.style.display = 'none';
      }
    });
popupTitle.textContent = 'Search Results';

    deletedBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      searchInput.value = '';
      this.style.display = 'none';
      showDefaultIcons();
      searchBox.classList.remove('active', 'filled');
      searchInput.style.color = '#5C5C66';
      searchInput.setAttribute('placeholder', 'Search here');
        searchInput.focus(); // اطمینان مضاعف

      resetToPhase1();
    });

    /* ────────────────────────────────────────
       🔍 فاز ۱: focus روی input
    ──────────────────────────────────────── */


    /* ────────────────────────────────────────
       🔍 فازهای ۲-۴: تایپ کردن
    ──────────────────────────────────────── */
    searchInput.addEventListener('input', function () {
  const query = this.value.trim().toLowerCase();

  if (query === '') {
    resetToPhase1();
    return;
  }

  
});


    /* ────────────────────────────────────────
       🔁 ریست به فاز ۱
    ──────────────────────────────────────── */
    function resetToPhase1() {
      popupTitle.textContent = 'Recent Searches';
      clearBtn.style.display = 'inline-block';
      searchList.style.display = 'block';
      noResults.style.display = 'none';
      resultsBox.style.display = 'none';

      listItems.forEach(item => {
        item.style.display = 'list-item';
        item.innerHTML = item.textContent;
      });
    }
const svgFocusIcon = `
<svg style="margin-right:8px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path d="M2 16.9515L5.23349 17.6996L5.97728 14.4834" stroke="#706DF2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path opacity="0.4" d="M18.2162 17.7002L21.9999 21.4753" stroke="#706DF2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M21.6478 5.32623L18.4143 4.57812L17.6705 7.79433" stroke="#706DF2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M18.4053 4.85156C21.8377 8.4029 21.814 14.0645 18.3189 17.5877C16.1297 19.7942 13.0908 20.6439 10.2465 20.1358" stroke="#706DF2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path opacity="0.4" d="M5.24054 17.4268C1.80812 13.8755 1.83191 8.21384 5.32702 4.69061C7.5162 2.48522 10.5551 1.63442 13.3994 2.14251" stroke="#706DF2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const svgInputIcon = `
<svg style="margin-right:0px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path opacity="0.4" d="M17.6691 16.6162L22 21.2326" stroke="#706DF2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M19.5401 10.77C19.5401 15.6138 15.6138 19.54 10.77 19.54C5.92623 19.54 2 15.6138 2 10.77C2 5.92623 5.92623 2 10.77 2" stroke="#706DF2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M16.5343 8.02025L16.6513 7.7037C17.0923 6.51007 18.0321 5.56896 19.2239 5.12728L19.54 5.01014L19.2239 4.89301C18.0321 4.45133 17.0923 3.51022 16.6513 2.31659L16.5343 2L16.4173 2.31659C15.9763 3.51022 15.0366 4.45133 13.8447 4.89301L13.5286 5.01014L13.8447 5.12728C15.0366 5.56896 15.9763 6.51007 16.4173 7.7037L16.5343 8.02025Z" stroke="#706DF2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M11.1702 12.3083C11.3689 11.6545 11.8799 11.1428 12.5328 10.9437C11.8799 10.7447 11.3689 10.233 11.1702 9.5791C10.9715 10.233 10.4605 10.7447 9.80762 10.9437C10.4605 11.1428 10.9715 11.6545 11.1702 12.3083Z" stroke="#706DF2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

    /* ────────────────────────────────────────
       ✨ هایلایت متن
    ──────────────────────────────────────── */
 function highlightText(text, query) {
  if (!query) return `<span style="color:black;">${text}</span>`;

  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'); // حساس به حروف کوچک و بزرگ و ایمن
  const parts = text.split(regex);

  // parts یک آرایه است که شامل رشته‌های تطابق یافته و غیرتطابق یافته است.
  // تطابق یافته‌ها در ایندکس‌های فرد قرار دارند، غیرتطابق یافته‌ها در ایندکس‌های زوج

  return parts.map(part => {
    if (part.toLowerCase() === query.toLowerCase()) {
      // بخش مطابق: رنگ آبی و بولد
      return `<span style="color:#706DF2; font-weight: 400;">${part}</span>`;
    } else {
      // بخش غیرمطابق: رنگ مشکی
      return `<span style="color: #8A8999;">${part}</span>`;
    }
  }).join('');
}

searchInput.addEventListener('focus', () => {
  showFocusIcons();
  searchBox.classList.add('active');
  searchBox.classList.remove('filled');
  searchInput.style.color = '#000';
  searchInput.setAttribute('placeholder', '');

  searchOverlay.classList.add('active');

  popupTitle.style.display = 'inline-block';
  popupTitle.textContent = 'Recent Searches';  // ✅ وقتی فقط کلیک کنی
  clearBtn.style.display = 'inline-block';

  searchList.style.display = 'block';   // ✅ اصلاح شد (listContainer → searchList)
  noResults.style.display = 'none';     // ✅ اصلاح شد (noResultsBox → noResults)
  resultsBox.style.display = 'none';
  
  if (bottomNav) {
    bottomNav.classList.remove('hide-bottom-nav');
  }

  listItems.forEach(item => {
    const clean = item.textContent.trim().replace(/^✧\s*/, '');
    item.dataset.text = clean;
    item.innerHTML = svgFocusIcon + `<span style="color:#4b43c4;font-weight:400">${clean}</span>`;
    item.style.display = 'block';
  });
});

searchInput.addEventListener('input', function () {
  const query = this.value.trim().toLowerCase();

  if (query === '') {
    resetToPhase1();
    return;
  }

  showFocusIcons();
  popupTitle.textContent = 'Suggestions';  // ✅ اصلاح شد
  clearBtn.style.display = 'none';

  let anyVisible = false;

  listItems.forEach(item => {
    const text = item.textContent.toLowerCase();
    if (text.includes(query)) {
      item.style.display = 'list-item';
      item.innerHTML = svgInputIcon + highlightText(item.textContent, query);
      anyVisible = true;
    } else {
      item.style.display = 'none';
    }
  });

  noResults.style.display = 'none';
  resultsBox.style.display = 'none';
  searchList.style.display = 'block';

  if (!anyVisible) {
    searchList.style.display = 'none';
    noResults.style.display = 'flex';

    setTimeout(() => {
      if (searchInput.value.trim() !== '') {
        noResults.style.display = 'none';
        resultsBox.style.display = 'block';
      }
    }, 1500);
  }
});


function resetToPhase1() {
  popupTitle.textContent = 'Recent Searches';
  clearBtn.style.display = 'inline-block';
  searchList.style.display = 'block';
  noResults.style.display = 'none';
  resultsBox.style.display = 'none';

  listItems.forEach(item => {
    item.style.display = 'list-item';
    const clean = item.textContent.trim().replace(/^✧\s*/, '');
    item.dataset.text = clean;
    item.innerHTML = svgFocusIcon + `<span style="color:#4b43c4;font-weight:400">${clean}</span>`;
  });
}


    /* ────────────────────────────────────────
       🗑️ Clear All
    ──────────────────────────────────────── */
    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        searchInput.value = '';
        deletedBtn.style.display = 'none';
        showDefaultIcons();
        searchOverlay.style.display = 'none';
        searchBox.classList.remove('active', 'filled');
        resetToPhase1();
      });
    }

    /* ────────────────────────────────────────
       🔒 بستن overlay با کلیک بیرون
    ──────────────────────────────────────── */
      /* ────────────────────────────────────────
       🔒 بستن overlay و Filter Modal با کلیک بیرون (FIXED)
    ──────────────────────────────────────── */
  document.addEventListener('click', function (e) {
    // ۱. بستن Search Overlay
    const clickedSearch = searchBox.contains(e.target);
    const clickedOverlay = searchOverlay.contains(e.target);

    if (!clickedSearch && !clickedOverlay) {
        searchOverlay.classList.remove('active');
        showDefaultIcons();
    }

    // ۲. بستن Filter Modal
    // عناصر مورد نیاز
    const isFilterOpen = !filterModal.classList.contains('hidden');
    const clickedFilterBtn = filterBtn && filterBtn.contains(e.target);
    const clickedFilterModal = filterModal && filterModal.contains(e.target);


    // اگر مودال باز است و کلیک نه روی دکمه فیلتر بود و نه داخل خود مودال
    if (isFilterOpen && !clickedFilterBtn && !clickedFilterModal) {
        
        // اطمینان حاصل می‌کنیم که کاربر روی دکمه‌های inside filterModal هم کلیک نکرده باشد
        // در صورت لزوم می‌توانید این خط را حذف کنید، اما برای جلوگیری از بسته شدن ناخواسته خوب است
        const isButtonInsideModal = e.target.closest('.filter-modal'); 

        // اگر کلیک خارج از مودال بود
        if (!isButtonInsideModal) {
            filterModal.classList.add('hidden'); // بستن مودال
            filterBtn.classList.remove('active-filter'); // حذف حالت فعال از دکمه
            
            if (bottomNav) {
                bottomNav.classList.remove('hide-bottom-nav');
            }
        }
    }
});



    /* ────────────────────────────────────────
       ⌨️ Escape key
    ──────────────────────────────────────── */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        searchOverlay.style.display = 'none';
        filterModal.classList.add('hidden');
        showDefaultIcons();
      }
    });

    /* ────────────────────────────────────────
       🎛️ Filter Button (toggle active-filter)
       دقیقاً از کد اصلی
    ──────────────────────────────────────── */
   if (filterBtn) {
  filterBtn.addEventListener('click', function (e) {
    e.preventDefault();

    this.classList.toggle('active-filter');
    filterModal.classList.toggle('hidden');

    // ✅ فقط همین دو خط
    searchOverlay.classList.remove('active');
    searchInput.blur();
  });
}


    /* ────────────────────────────────────────
       🔄 تغییر آیکن‌های داخل مودال
       دقیقاً از کد اصلی
    ──────────────────────────────────────── */
    const icons = document.querySelectorAll(".icon-left, .icon-right, .icon-single");

    icons.forEach(icon => {
      icon.addEventListener("click", () => {
        const isActive = icon.classList.toggle("active");
        icon.src = isActive ? "./img/24.png" : "./img/23.png";
      });
    });

    /* ────────────────────────────────────────
       📝 حالت filled برای input ها
       دقیقاً از کد اصلی
    ──────────────────────────────────────── */
   document.querySelectorAll('.input-icon-wrapper input').forEach(inp => {
  inp.addEventListener('blur', () => {
    const wrapper = inp.closest('.input-icon-wrapper');
    if (inp.value.trim() !== '') {
      wrapper.classList.add('filled');
    } else {
      wrapper.classList.remove('filled');
    }
  });
});


    /* ────────────────────────────────────────
       🔘 دکمه‌های Type
       دقیقاً از کد اصلی
    ──────────────────────────────────────── */
  /* ────────────────────────────────────────────
   🔘 دکمه‌های Type - نسخه اصلاح شده
──────────────────────────────────────── */
document.querySelectorAll('.options button').forEach(btn => {
  btn.addEventListener('click', function() {
    // ✅ toggle کلاس active-option
    this.classList.toggle('active-option');
    
    // ✅ لاگ برای دیباگ (می‌تونید حذف کنید)
    console.log('Button clicked:', this.textContent, 'Active:', this.classList.contains('active-option'));
  });
});


  } // پایان initHeader

  /* ─────────────────────────────────────────────
     اجرا
  ───────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      injectHeader();
      initHeader();
    });
  } else {
    injectHeader();
    initHeader();
  }

document.addEventListener("DOMContentLoaded", () => {
  const cityInput   = document.getElementById("cityInput");
  const cityLabel   = cityInput.querySelector(".city-label");
  const selectedTxt = cityInput.querySelector(".selected-city");
  const cityOptions = cityInput.querySelector(".city-options");
  const options     = cityInput.querySelectorAll(".city-option");

  /* ==============================
     1. باز و بسته شدن dropdown
  ============================== */
  cityInput.addEventListener("click", (e) => {
    e.stopPropagation();

    // اگر روی option کلیک نشده
    if (!e.target.classList.contains("city-option")) {
      cityInput.classList.toggle("expanded");
    }
  });

  /* ==============================
     2. انتخاب شهر
  ============================== */
  options.forEach(option => {
    option.addEventListener("click", (e) => {
      e.stopPropagation();

      const cityName = option.dataset.city;

      // مقدار انتخاب‌شده
      if (selectedTxt) {
        selectedTxt.textContent = cityName;
      }

      // وضعیت پر شده
      cityInput.classList.add("filled");
      cityInput.classList.remove("expanded");

      // استایل لیبل City
      cityLabel.style.color = "#706DF2";
      cityLabel.style.fontWeight = "500";
    });
  });

  /* ==============================
     3. کلیک بیرون → بستن dropdown
  ============================== */
  document.addEventListener("click", () => {
    cityInput.classList.remove("expanded");
  });

  /* ==============================
     4. Observer برای مدیریت رنگ City
     (expanded / filled / default)
  ============================== */
  const observer = new MutationObserver(() => {
    const isExpanded = cityInput.classList.contains("expanded");
    const isFilled   = cityInput.classList.contains("filled");

    if (isExpanded) {
      cityLabel.style.color = "#706DF2";
      cityLabel.style.fontWeight = "400";
    } else if (isFilled) {
      cityLabel.style.color = "#706DF2";
      cityLabel.style.fontWeight = "500";
    } else {
      cityLabel.style.color = "#A9A7F7";
      cityLabel.style.fontWeight = "400";
    }
  });

  observer.observe(cityInput, {
    attributes: true,
    attributeFilter: ["class"]
  });
});
// ===============================
// MAP PAGE - AUTO TRANSPARENT HEADER (FIX V2)
// ===============================
(function () {
  function isMapPage() {
    return (
      window.location.pathname.includes('map') ||
      window.location.href.includes('map') ||
      document.body.classList.contains('map-page')
    );
  }

  function applyTransparency() {
    if (!isMapPage()) return;

    // ✅ CSS Injection - قوی‌ترین روش
    const styleId = 'map-transparent-header';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        /* شفاف‌سازی تمام لایه‌های هدر */
        #fara-header-root,
        #farra-header-root,
        [id*="fara"][id*="header"],
        .headers-fixed,
        .header-fixed,
        .header,
        header {
          background: transparent !important;
          background-color: transparent !important;
          background-image: none !important;
          box-shadow: none !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
        }
        
        /* اگر blur layer جداگانه‌ای دارید */
        .header-blur {
          display: none !important;
        }
      `;
      document.head.appendChild(style);
      console.log('✅ Transparent header CSS injected for map page');
    }
  }

  // اجرا در مراحل مختلف
  function runFixes() {
    applyTransparency();
    
    // بررسی مجدد بعد از inject شدن DOM
    setTimeout(applyTransparency, 100);
    setTimeout(applyTransparency, 300);
    setTimeout(applyTransparency, 600);
  }

  // شروع
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runFixes);
  } else {
    runFixes();
  }

  // Observer برای تغییرات DOM
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes.length) {
        mutation.addedNodes.forEach(function(node) {
          if (node.id && node.id.includes('fara')) {
            applyTransparency();
          }
        });
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

})();


})();
  