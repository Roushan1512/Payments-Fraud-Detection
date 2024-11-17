<h1
  align="center"
  font-size="50px"> 
Cypher </h1>

<div align="center" style="margin: 20px 0;">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="clientside/public/Cypher_logo_.png" alt="Logo" width="80" height="80"/>
  </a>
</div>

<p align="center" style="font-size: 20px; font-weight: bold; display: flex; justify-content: center; gap: 20px;">
  <img src="https://img.shields.io/badge/Version-1.0.0-blue.svg" alt="Version"/>
  <img src="https://img.shields.io/badge/License-MIT-brightgreen.svg" alt="License"/>
</p>

---

<h3
  align="center"
>
A payment fraud detection application that uses machine learning to detect and flag suspicious transactions in real-time.</h3>

## Features ✨

- **Constantly monitors transactions as they occur, quickly identifying any irregularities or suspicious patterns.**

- **Utilizes machine learning models to analyze vast amounts of data, learning from past transactions to improve fraud detection accuracy over time.**

- **Examines user behavior and transaction patterns to detect anomalies that may indicate fraudulent activity.**

## How To Run 🔧

#### Install our-project with npm

For frontend:

- **Navigate to the project directory:**

```bash
  cd clientside
```

- **Install dependencies: npm install**
- **Run the project:**

```bash
  npm run dev
```

For backend:

- **Navigate to the project directory:**

```bash
  cd server
```

- **Create a new enviorment:**

```bash
  python -m venv fraud_env
```

- **To select the enviorment(cmd is better than powershell for this)**

- **Install the required packages:**

```bash
  pip install -r requirements.txt
```

- **Run the server:**

```bash
  python server.py
```

## Tech Stack ⚙

#### Frontend:

- React
- Redux Toolkit
- Tailwind CSS

#### Backend:

- Python
- Flux
- PostgreSQL

#### Models:

- Pandas
- NumPy
- Scikit-learn

## Usage 🌟

- Curious about how our payment fraud application works? Sign up for a free demo session to see real-time fraud detection in action and learn how it can benefit your organization.

- Unlock the full potential of our payment fraud detection system by obtaining your unique API key. With access to our API, you'll enjoy seamless integration and enhanced control over fraud prevention measures.

- Secure your transactions with confidence using our payment section. Our advanced encryption protocols ensure the safety of your financial data at every step of the payment process.

- Gain valuable insights at a glance with our intuitive dashboard. Monitor transaction volume and farudulent activity, fraud under review, and total number of frauds detected and many more.

## Overview of the Machine Learning Model 📊

Our fraud detection model uses supervised learning on historical transaction data, employing features like transaction amount, type, and user behavior. Algorithms such as Random Forest and Gradient Boosted Trees classify transactions, continuously improving accuracy for real-time fraud prevention.

#### **1. Data Exploration**

- **Objective:** Understand the structure, patterns, and distributions in the dataset.
- **Steps:**
  - Load the dataset using libraries like `pandas`.
  - Inspect data types, missing values, and basic statistics (`df.info()`, `df.describe()`).
  - Visualize distributions of key features like transaction amounts and balances (`sns.histplot`, `sns.boxplot`).
  - Examine class distributions to check for imbalance between `Fraud` and `No Fraud` cases.

#### **2. Data Preprocessing**

- **Objective:** Clean and transform the data for model training.
- **Steps:**
  - **Handle Missing Values:** Replace or drop rows/columns with missing data.
  - **Feature Encoding:** Convert categorical variables (e.g., transaction type) into numeric form using techniques like one-hot encoding or label encoding.
  - **Feature Scaling:** Normalize or standardize numerical features for uniform scaling (e.g., `StandardScaler`, `MinMaxScaler` from `sklearn`).
  - **Class Balancing:** If fraud cases are underrepresented, oversample (e.g., SMOTE) or undersample the dataset.

#### **3. Model Training**

- **Objective:** Train a model to classify transactions as `Fraud` or `No Fraud`.
- **Steps:**
  - **Define Features and Target:** Separate independent variables (`type`, `amount`, etc.) and the dependent variable (`isFraud`).
  - **Train-Test Split:** Split the dataset into training and testing sets using `train_test_split`.
  - **Model Selection:** Use a machine learning algorithm like Random Forest, Logistic Regression, or Gradient Boosted Trees.
  - **Training:** Fit the model on the training data (`model.fit(X_train, y_train)`).

#### **4. Model Evaluation**

- **Objective:** Assess the model’s performance on unseen data.
- **Steps:**
  - Make predictions on the test set (`model.predict(X_test)`).
  - Calculate performance metrics:
    - **Accuracy:** Overall correctness of predictions.
    - **Precision:** Proportion of predicted fraud cases that are actual frauds.
    - **Recall:** Ability to detect all actual fraud cases.
    - **F1-Score:** Harmonic mean of precision and recall.
    - **Confusion Matrix:** Breakdown of true positives, false positives, etc.
  - Visualize results using confusion matrices and ROC curves.

#### **5. Feature Importance**

- **Objective:** Identify which features contribute most to predictions.
- **Steps:**
  - For tree-based models (like Random Forest), extract feature importances (`model.feature_importances_`).
  - Plot the importance scores for better interpretability (e.g., bar charts).

#### **6. Final Model Export**

- **Objective:** Save the trained model for deployment.
- **Steps:**
  - Serialize the trained model using `pickle` or `joblib` for reuse in APIs (`pickle.dump(model, open('model.pkl', 'wb'))`).

#### **7. Visualization and Insights**

- **Objective:** Share key findings from the dataset and model.
- **Steps:**
  - Visualize fraudulent vs. non-fraudulent transactions.
  - Highlight high-risk features that differentiate fraud from legitimate transactions.
  - Present evaluation results with charts (e.g., bar plots, pie charts, ROC curves).

---

## Prediction Pipeline 🚀

- **Real-Time Data Ingestion:** New transaction data is ingested in real-time from various sources.
- **Data Preprocessing:** The incoming data is preprocessed to match the format and features used during training.
- Feature Extraction: Relevant features are extracted from the raw data to be fed into the model.
- **Model Prediction:** The preprocessed data is passed through the trained Random Forest model to predict the likelihood of fraud.
- **Decision Making:** Based on the model's output, transactions are either flagged for further review or approved.

## Model Selection 🧠

#### Decision Tree is recommended due to its high precision (0.999706)

which minimizes false positives. This means it excels at correctly identifying genuine transactions. This is crucial when false positives (incorrectly classifying genuine transactions as fraudulent) are highly undesirable.

- Decision Tree is a strong choice due to its high precision, making it ideal for minimizing false positives.
- If the cost of missing fraudulent transactions is a major concern, Random Forest could be an alternative.

## Contributors ⚡

<table>
  <tbody>
    <tr style="display: flex; justify-content: center; gap: 20px;">
      <td align="center" 
        style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
        <a href="https://roushan.co/">
          <img 
            src="https://avatars.githubusercontent.com/u/132154286?v=4" 
            width="100px" 
            style="border-radius:20px;"
            alt="profile picture" />
          <br />
          <sub><b style="font-size: 18px; font-weight: 500; white-space: nowrap;"
            >Roushan Poddar</b></sub>
        </a>
        <a href="https://github.com/Roushan1512r">
          <img 
            src="https://img.icons8.com/ios-glyphs/30/000000/github.png" 
            alt="GitHub" 
            style="filter: invert(1);" />
        </a>
      </td>
      <td align="center" 
        style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
        <a href="https://avirupray.co/">
          <img 
            src="https://avatars.githubusercontent.com/u/112892599?v=4" 
            width="100px" 
            style="border-radius:20px;"
            alt="profile picture" />
          <br />
          <sub><b style="font-size: 18px; font-weight: 500; white-space: nowrap;">Avirup Ray</b></sub>
        </a>
        <a href="https://github.com/AvirupRay">
          <img 
            src="https://img.icons8.com/ios-glyphs/30/000000/github.png" 
            alt="GitHub" 
            style="filter: invert(1);" />
        </a>
      </td>
      <td align="center" 
        style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
        <a href="https://github.com/Avijit-Mondal">
          <img 
            src="https://avatars.githubusercontent.com/u/116331842?v=4" 
            width="100px" 
            style="border-radius:20px;"
            alt="profile picture" />
          <br />
          <sub><b style="font-size: 18px; font-weight: 500; white-space: nowrap;">Avijit Mondal</b></sub>
        </a>
        <a href="https://github.com/Avijit-Mondal">
          <img 
            src="https://img.icons8.com/ios-glyphs/30/000000/github.png" 
            alt="GitHub" 
            style="filter: invert(1);" />
        </a>
      </td>
      <td align="center" 
        style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
        <a href="https://www.sahilraja.co/">
          <img 
            src="https://avatars.githubusercontent.com/u/145694814?s=400&u=59d335fc289d8bdc508549b2f6d61dab56db313d&v=4" 
            width="100px" 
            style="border-radius:20px;"
            alt="profile picture" />
          <br />
          <sub><b style="font-size: 18px; font-weight: 500; white-space: nowrap;">MD Sahil Raja</b></sub>
        </a>
        <a href="https://github.com/Not-Sahil-Raja">
          <img 
            src="https://img.icons8.com/ios-glyphs/30/000000/github.png" 
            alt="GitHub" 
            style="filter: invert(1);" />
        </a>
      </td>
    </tr>
  </tbody>
</table>

## Resources 📚

### [Decision Trees At Scikit Learn](https://scikit-learn.org/1.5/modules/tree.html)

### [Decision Trees At Google Developers](https://developers.google.com/machine-learning/decision-forests/decision-trees)

### [Random Forest Algorithm At Builtin.com](https://builtin.com/data-science/random-forest-algorithm)

### [Random Forest Algorithm Visual Representation](https://youtu.be/cIbj0WuK41w?si=5AR_ImM9xt_ybDOM)

## Appendix 📖

> Note : This project is **not completed yet** , We are currently working on it. A lot of more features are yet to be added to complete it.

## Feedback 📧

If you have any feedback, please reach out to us at roushanp2003@gmail.com
