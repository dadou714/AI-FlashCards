"use client";
import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  AppBar,
  Button,
  Container,
  Toolbar,
  Box,
  Typography,
  Grid,
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const handleSubmit = async () => {
    const checkoutSession = await fetch("/api/checkout_session", {
      method: "POST",
      headers: {
        origin: "http://localhost:3000",
      },
    });
    const checkoutSessionJson = await checkoutSession.json();
    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message);
      return;
    }

    const stripe = await getStripe();
    console.log(`ID: ${checkoutSessionJson.id}`);
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });

    if (error) {
      console.warn(error.message);
    }
  };

  return (
    <Container maxWidth="100vw">
      <title>Flashcard Saas</title>
      <meta name="description" content="Create flashcards from your text" />

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Flashcard Saas
          </Typography>
          <SignedOut>
            <Button color="inherit" href="sign-in">
              {" "}
              Login
            </Button>
            <Button color="inherit" href="sign-up">
              {" "}
              Sign Up
            </Button>
          </SignedOut>
        </Toolbar>
      </AppBar>

      <Box sx={{ my: 6, textAlign: "center" }}>
        <Typography variant="h3"> Flashcards Made Easy</Typography>
        <Typography variant="h5">
          {" "}
          The easiest way to create flashcards from your text
        </Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={() => router.push("/generate")}
        >
          Get Started
        </Button>
      </Box>

      <Box sx={{ my: 6, textAlign: "center" }} pudderButtom>
        <Typography variant="h2">Features</Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h5">Easy Text Input</Typography>
            <Typography>
              {" "}
              Simply input your text and let our software do the rest. Creating
              flashcards has never been easier.
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h5">Easy Text Input</Typography>
            <Typography>
              {" "}
              Our AI intelligently breaks down your text into concise
              flashcards. perfect for studying.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" gutterBottom>
              Accessible
            </Typography>
            <Typography>
              {" "}
              Simply input your text and let our software do the rest. Creating
              flashcards has never been easier.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ my: 6, textAlign: "center" }} pudderButtom>
        <Typography variant="h2">Pricing</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                my: 6,
                textAlign: "center",
                p: 3,
                border: "1px solid",
                borderColor: "grey.300",
                borderRadius: 2,
              }}
            >
              <Typography variant="h5">Basic</Typography>
              <Typography variant="h6" gutterBottom>
                $5 / month
              </Typography>
              <Typography>
                {" "}
                Access to basic flashcard features and limited storage
              </Typography>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Choose Basic
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                my: 6,
                textAlign: "center",
                p: 3,
                border: "1px solid",
                borderColor: "grey.300",
                borderRadius: 2,
              }}
            >
              <Typography variant="h5">Basic</Typography>
              <Typography variant="h6" gutterBottom>
                $10 / month
              </Typography>
              <Typography>
                {" "}
                Unlimited flashcards and storage with priority support
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Choose Pro
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
