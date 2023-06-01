import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
} from "@tremor/react";

export default function ReportTable({ reports }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell></TableHeaderCell>
          <TableHeaderCell>신고사유</TableHeaderCell>
          <TableHeaderCell>신고자</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {reports.map(({ value, user }, index) => (
          <TableRow key={index}>
            <TableCell>
              <Text>{index + 1}</Text>
            </TableCell>
            <TableCell>
              <Text>{value}</Text>
            </TableCell>
            <TableCell>
              <Text>
                {user.nickname}
                <br />({user.email})
              </Text>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
