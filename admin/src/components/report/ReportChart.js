import { Legend, Title, DonutChart } from "@tremor/react";

const valueFormatter = (number) => `${number}건`;
const indexColors = ["slate", "violet", "rose", "cyan", "amber"];
const REPORTS = [
  {
    id: 1,
    value: "부적절한 표현, 욕설 또는 혐오 표현",
  },
  {
    id: 2,
    value: "스팸 또는 사용자를 현혹하는 콘텐츠",
  },
  {
    id: 3,
    value: "유해하거나 위험한 컨텐츠",
  },
  {
    id: 4,
    value: "증오 또는 위험한 콘텐츠",
  },
];

export default function ReportChart({ reports }) {
  const data = REPORTS.map((item) => ({
    value: item.value,
    count: 0,
  }));
  for (let i = 0; i < reports.length; i++) {
    const index = data.findIndex((item) => item.value === reports[i].value);
    data[index].count++;
  }
  return (
    <div className="w-full max-w-2xl mx-auto flex items-center">
      <DonutChart
        className="mt-6 max-w-sm"
        data={data}
        category="count"
        index="value"
        valueFormatter={valueFormatter}
        colors={indexColors}
      />
      <Legend
        className="mt-3 flex flex-col"
        categories={REPORTS.map((item) => item.value)}
        colors={indexColors}
      />
    </div>
  );
}
