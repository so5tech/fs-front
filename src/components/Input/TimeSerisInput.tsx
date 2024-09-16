import React, { useState } from 'react';
import Charts from '../../Visuals/Chart';


// interface DataPoint {
//   date: string;
//   value: string;
// }

const CSVInput: React.FC = () => {
  const [datesValues, setDatesValues] = useState<{ date: string; value: string }[]>([{ date: '', value: '' }]);
  const [csvData, setCsvData] = useState<string>('');
  const [interpolatedData, setInterpolatedData] = useState<{ date: string; value: number }[]>([]);

  const handleDateChange = (index: number, newDate: string) => {
    const updatedDatesValues = [...datesValues];
    updatedDatesValues[index].date = newDate;
    setDatesValues(updatedDatesValues);
  };

  const handleValueChange = (index: number, newValue: string) => {
    const updatedDatesValues = [...datesValues];
    updatedDatesValues[index].value = newValue;
    setDatesValues(updatedDatesValues);
  };

  const handleAddDateValuePair = () => {
    const lastDate = datesValues[datesValues.length - 1]?.date;
    let nextDate = '';

    if (lastDate) {
      const date = new Date(lastDate);
      date.setDate(date.getDate() + 1);
      nextDate = date.toISOString().split('T')[0];
    }

    setDatesValues([...datesValues, { date: nextDate, value: '' }]);
  };

  const interpolateValues = (startDate: string, endDate: string, startValue: number, endValue: number) => {
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    // const stepTime = diffTime / 99; // 100 points, so 99 intervals

    const values: { date: string; value: number }[] = [];
    for (let i = 0; i <= 99; i++) {
      const fraction = i / 99;
      const interpolatedDate = new Date(date1.getTime() + fraction * diffTime);
      const interpolatedValue = startValue + fraction * (endValue - startValue);

      values.push({
        date: interpolatedDate.toISOString().split('T')[0],
        value: interpolatedValue,
      });
    }

    return values;
  };

  const handleGenerateCSV = () => {
    if (datesValues.some(item => !item.date || !item.value)) return;

    const interpolatedValues = interpolateValues(
      datesValues[0].date,
      datesValues[datesValues.length - 1].date,
      parseFloat(datesValues[0].value),
      parseFloat(datesValues[datesValues.length - 1].value)
    );

    const csvString = interpolatedValues.map(item => `${item.date},${item.value}`).join('\n');
    setCsvData(csvString);
    setInterpolatedData(interpolatedValues); // Set interpolated data for the charts
  };

  return (
    <div className="csv-input">
      <h2>Enter Time Series Data</h2>
      <div className="input-container">
        {datesValues.map((item, index) => (
          <div key={index}>
            <div>
              <label htmlFor={`date-${index}`}>Date {index + 1}:</label>
              <input
                id={`date-${index}`}
                type="date"
                value={item.date}
                onChange={(e) => handleDateChange(index, e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor={`value-${index}`}>Value {index + 1}:</label>
              <input
                id={`value-${index}`}
                type="text"
                value={item.value}
                onChange={(e) => handleValueChange(index, e.target.value)}
                placeholder={`Value ${index + 1}`}
                required
              />
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleAddDateValuePair}>Add Another Date-Value Pair</button>
      <button onClick={handleGenerateCSV}>Generate CSV with Interpolated Values</button>
      <div>
        <h3>CSV Data:</h3>
        <textarea
          readOnly
          rows={10}
          cols={50}
          value={csvData}
        />
      </div>
      {interpolatedData.length > 0 && <Charts data={interpolatedData} />}
    </div>
  );
};

export default CSVInput;
