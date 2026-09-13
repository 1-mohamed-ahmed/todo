//  =========== MATERIAL UI DIALOG =============
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
//  =========== ============= =============

export default function ShowDialog({ handleClose, deleteTodo, todo }) {
  return (
    <>
      {/* Delete Dialog */}
      <Dialog open={true} onClose={handleClose}>
        <DialogTitle>حذف المهمة</DialogTitle>

        <DialogContent>
          <DialogContentText>هل أنت متأكد من حذف هذه المهمة؟</DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>إلغاء</Button>

          <Button onClick={() => deleteTodo(todo.id)} color="error" autoFocus>
            حذف
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
