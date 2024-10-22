import React from 'react';
import {makeStyles, Button, Link, Dialog, DialogContent, DialogContentText, DialogActions} from '@mui/material';

const GuideButton: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Button
        sx={{ color: 'white', borderColor: 'white', '&:hover': {backgroundColor: 'rgb(65, 77, 89)',},margin: '0px 0px 0px auto'}}
        variant="outlined"
        onClick={handleOpen}
      >
        説明
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-describedby="scroll-dialog-description"
      >
        <DialogContent dividers={true}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <h2 className="buttonBigText">使い方</h2>
            <h4 className="buttonText">【STEP 1】</h4>
              <p className="buttonText">
              <Link href="https://wikiwiki.jp/taiko-fumen/%E4%BD%9C%E5%93%81/%E6%96%B0AC" underline="hover" target="_blank" rel="noopener noreferrer">
                譜面画像
              </Link>
              を見ながら、リズム単位、個数、BPM、入力打数に値を入力する。<br/>
              <div className="buttonSmallText">(ブクマに追加したり、ホーム画面に追加したりすると多分アクセスがしやすくなる)</div>
              </p>

            <h4 className="buttonText">【STEP 2】</h4>
              <p className="buttonText">
                随時で秒速、連打秒数、連打の理論値が確認できる。<br/><br/>
              </p>

            <hr className="bd2"></hr>

            <h2 className="buttonBigText">計算式</h2>
            <p className="buttonText1">
              ·連打秒数 = (240*個数/リズム単位-5)/BPM<br/>
              <div className="buttonSmallText">(連打終点では1/12拍が削られていることを考慮)<br/></div>
              ·秒速 = 入力打数/連打秒数<br/>
              ·理論値 = (連打秒数*60)を整数単位で切り上げた値<br/>
              <div className="buttonSmallText">(例: 16.02打→17打、14.00打→14打)<br/><br/></div>
            </p>
            <p className="buttonText">
            <Link href="https://wikiwiki.jp/taiko-fumen/%E5%8F%8E%E9%8C%B2%E6%9B%B2/%E9%80%A3%E6%89%93%E7%A7%92%E6%95%B0%E8%A1%A8" underline="hover" target="_blank" rel="noopener noreferrer">
                参考元
              </Link>
              を見ると、上記の連打秒数を基準としてミリ秒単位で値を丸めて指定されていることにより、理論値や秒速がたまにズレる説や、理論値を上回って連打が入るケースが稀にあるらしいので、<b>目安程度にお願いします</b>。
            </p>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>閉じる</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default GuideButton;