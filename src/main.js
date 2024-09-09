(function () {
  const FORM = document.querySelector(".js-form");
  const NUMBER_INPUTS = Array.from(
    document.querySelectorAll(".js-number-input")
  );
  const RADIO_BTN = Array.from(document.querySelectorAll(".radio-input"));
  const results = document.querySelector(".card--result");
  const clear_all = document.querySelector(".js-clear-all");

  //  removes default html validation information
  document.addEventListener(
    "invalid",
    (e) => {
      e.preventDefault();
      showError();
    },
    true
  );

  /************************************** form validation section ***************************/
  FORM.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!FORM.checkValidity()) {
      showError();
    } else {
      displayResult();
    }
  });

  // removes error if valid
  NUMBER_INPUTS.forEach((input) => {
    const error_text = document.querySelector(`.${input.id}-error-text`);
    const span = document.querySelector(`.${input.id}-js`);

    input.addEventListener("input", () => {
      if (input.validity.valid) {
        error_text.classList.add("hide");
        span.style.backgroundColor = "";
        span.style.color = "";
        span.style.borderColor = "";
        input.style.border = "";
      }
    });
  });

  RADIO_BTN.forEach((input) => {
    const error_text = document.querySelector(`.repayment-error-text`);

    input.addEventListener("input", () => {
      if (input.validity.valid) {
        error_text.classList.add("hide");
      }

      green(input);
    });
  });

  /****************************************** error function *****************************/
  function showError() {
    // number inputs
    NUMBER_INPUTS.forEach((input) => {
      const error_text = document.querySelector(`.${input.id}-error-text`);
      const span = document.querySelector(`.${input.id}-js`);

      function error(message = "This field is required") {
        error_text.classList.remove("hide");
        input.style.border = "1px solid hsl(4, 69%, 50%)";
        span.style.backgroundColor = "hsl(4, 69%, 50%)";
        span.style.color = "hsl(0, 0%, 100%)";
        span.style.borderColor = "hsl(4, 69%, 50%)";
        error_text.textContent = message;
      }

      if (input.validity.valueMissing) {
        error();
      }

      if (input.validity.rangeOverflow || input.validity.rangeUnderflow) {
        error(
          `Please make sure the value is within ${input.min} - ${input.max}`
        );
      }
    });

    // radio buttons
    RADIO_BTN.forEach((input) => {
      const error_text = document.querySelector(`.repayment-error-text`);

      if (input.validity.valueMissing) {
        error_text.classList.remove("hide");
        error_text.textContent = "This field is required";
      }
    });
  }

  /*************************************** green thingy ***************************************/
  function green(element) {
    const label = document.querySelector(`.js-${element.id}`);
    const repayment = document.querySelector(`.js-${RADIO_BTN[0].id}`);
    const interest = document.querySelector(`.js-${RADIO_BTN[1].id}`);

    label.classList.add("green");

    if (label.classList.contains("green") && element === RADIO_BTN[0]) {
      interest.classList.remove("green");
    }

    if (label.classList.contains("green") && element === RADIO_BTN[1]) {
      repayment.classList.remove("green");
    }
  }

  /******************************************display result **************************************/
  function displayResult() {
    function numberWithCommas(x) {
      return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }

    var monthlyRepayment = numberWithCommas(repayment());
    var interest = numberWithCommas(interestOnly());
    var totalRepayment = numberWithCommas(totalPayment());

    if (RADIO_BTN[0].checked) {
      results.innerHTML = `
         <div class="card--result__filled">
          <p class="title">Your results</p>
          <p class="info">
            Your results are shown below based on the information you provided.
            To adjust the results, edit the form and click “calculate
            repayments” again.
          </p>
          <div class="result--container">
            <p>Your monthly repayments</p>
            <p class="js-monthly result--container__monthly">£${monthlyRepayment}</p>
            <hr class="horizontal-rule" />
            <p class="above-total">Total you'll pay over the term</p>
            <p class="js-total result--container__total">£${totalRepayment}</p>
          </div>
        </div>

      `;
    } else if (RADIO_BTN[1].checked) {
      results.innerHTML = `
         <div class="card--result__filled">
          <p class="title">Your results</p>
          <p class="info">
            Your results are shown below based on the information you provided.
            To adjust the results, edit the form and click “calculate
            repayments” again.
          </p>
          <div class="result--container">
            <p>Your interest only</p>
            <p class="js-monthly result--container__monthly">£${interest}</p>
            <hr class="horizontal-rule" />
            <p class="above-total">Total you'll pay over the term</p>
            <p class="js-total result--container__total">£${totalRepayment}</p>
          </div>
        </div>

      `;
    }
  }

  /**************************************************** calculation functions  *********************************************/
  var calculate = {
    interestOnly: function () {
      var r = NUMBER_INPUTS[2].value / 100;
      var p = NUMBER_INPUTS[0].value;

      return parseFloat(((r * p) / 12).toFixed(2));
    },

    repayment: function () {
      const p = parseFloat(NUMBER_INPUTS[0].value);
      const r = parseFloat(NUMBER_INPUTS[2].value / 100 / 12);
      const n = parseFloat(NUMBER_INPUTS[1].value * 12);

      var firstHalf = parseFloat(Math.pow(1 + r, n) * r);
      var secondHalf = parseFloat(Math.pow(1 + r, n) - 1);
      var finalHalf = parseFloat((p * (firstHalf / secondHalf)).toFixed(2));

      return parseFloat(finalHalf.toFixed(2));
    },

    totalPayment: function () {
      return parseFloat(
        (calculate.repayment() * (NUMBER_INPUTS[1].value * 12)).toFixed(2)
      );
    },
  };

  var interestOnly = calculate.interestOnly;
  var repayment = calculate.repayment;
  var totalPayment = calculate.totalPayment;

  /***************************************************clear all inputs ******************************************/
  clear_all.addEventListener("click", () => {
    NUMBER_INPUTS.forEach((input) => {
      input.value = "";
    });

    RADIO_BTN.forEach((input) => {
      input.checked = false;
      const label = document.querySelector(`.js-${input.id}`);
      label.classList.remove("green");
    });

    results.innerHTML = `
       <div class="card--result__empty">
          <img src="./assets/images/illustration-empty.svg" alt="" />
          <h2>Results shown here</h2>
          <p>
            Complete the form and click “calculate repayments” to see what your
            monthly repayments would be.
          </p>
        </div>    
    `;
  });
})();
